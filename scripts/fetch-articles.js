/**
 * 別のGitHubリポジトリから記事を取得するスクリプト
 * ビルド前に実行され、記事データを最新の状態に更新します
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

// 環境変数から設定を読み込む
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const REPO_OWNER = process.env.ARTICLES_REPO_OWNER; // 例: "your-username"
const REPO_NAME = process.env.ARTICLES_REPO_NAME; // 例: "blog-articles"
const BRANCH = process.env.ARTICLES_REPO_BRANCH || 'main';

// 出力先
const OUTPUT_FILE = path.join(__dirname, '../src/data/articles.json');

// 設定の検証
function validateConfig() {
  if (!GITHUB_TOKEN) {
    console.error('❌ エラー: GITHUB_TOKEN 環境変数が設定されていません');
    console.log('   GitHub Personal Access Token を .env ファイルに設定してください');
    process.exit(1);
  }
  if (!REPO_OWNER || !REPO_NAME) {
    console.error('❌ エラー: ARTICLES_REPO_OWNER または ARTICLES_REPO_NAME が設定されていません');
    console.log('   記事リポジトリの情報を .env ファイルに設定してください');
    process.exit(1);
  }
}

// GitHub APIリクエストを送信
function githubRequest(endpoint) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.github.com',
      path: endpoint,
      method: 'GET',
      headers: {
        'User-Agent': 'Node.js',
        'Authorization': `token ${GITHUB_TOKEN}`,
        'Accept': 'application/vnd.github.v3+json'
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        if (res.statusCode === 200) {
          resolve(JSON.parse(data));
        } else {
          reject(new Error(`GitHub API Error: ${res.statusCode} - ${data}`));
        }
      });
    });

    req.on('error', reject);
    req.end();
  });
}

// ファイルの内容を取得（Base64デコード）
function getFileContent(downloadUrl) {
  return new Promise((resolve, reject) => {
    https.get(downloadUrl, {
      headers: {
        'User-Agent': 'Node.js',
        'Authorization': `token ${GITHUB_TOKEN}`
      }
    }, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => resolve(data));
    }).on('error', reject);
  });
}

// meta.jsonを取得
async function fetchMeta() {
  console.log('📥 meta.json を取得中...');
  const endpoint = `/repos/${REPO_OWNER}/${REPO_NAME}/contents/meta.json?ref=${BRANCH}`;
  
  try {
    const response = await githubRequest(endpoint);
    const content = Buffer.from(response.content, 'base64').toString('utf-8');
    return JSON.parse(content);
  } catch (error) {
    console.error('❌ meta.json の取得に失敗:', error.message);
    throw error;
  }
}

// Markdownファイルを取得
async function fetchMarkdownContent(filePath) {
  const endpoint = `/repos/${REPO_OWNER}/${REPO_NAME}/contents/${filePath}?ref=${BRANCH}`;
  
  try {
    const response = await githubRequest(endpoint);
    const content = Buffer.from(response.content, 'base64').toString('utf-8');
    return content;
  } catch (error) {
    console.warn(`⚠️  ${filePath} の取得に失敗:`, error.message);
    return null;
  }
}

// Markdownから抜粋を生成（最初の段落を取得）
function extractExcerpt(markdown, maxLength = 200) {
  // フロントマターを削除
  let content = markdown.replace(/^---\n[\s\S]*?\n---\n/, '');
  
  // 見出しを削除
  content = content.replace(/^#+\s+.*$/gm, '');
  
  // 最初の段落を取得
  const paragraphs = content.split('\n\n').filter(p => p.trim().length > 0);
  const firstParagraph = paragraphs[0] || '';
  
  // 最大文字数に制限
  if (firstParagraph.length > maxLength) {
    return firstParagraph.substring(0, maxLength).trim() + '...';
  }
  
  return firstParagraph.trim();
}

// メイン処理
async function main() {
  console.log('🚀 記事の取得を開始します...\n');
  
  // 設定の検証
  validateConfig();
  
  console.log(`📚 リポジトリ: ${REPO_OWNER}/${REPO_NAME} (${BRANCH})`);
  console.log('');
  
  try {
    // meta.jsonを取得
    const meta = await fetchMeta();
    console.log(`✅ meta.json を取得しました（記事数: ${meta.articles.length}）\n`);
    
    // 各記事のMarkdownコンテンツを取得
    const articlesWithContent = [];
    
    for (const article of meta.articles) {
      console.log(`📄 ${article.slug} を処理中...`);
      
      // Markdownファイルのパスを構築
      const markdownPath = `articles/${article.file}`;
      const content = await fetchMarkdownContent(markdownPath);
      
      if (content) {
        // 抜粋がない場合は、Markdownから自動生成
        const excerpt = article.excerpt || extractExcerpt(content);
        
        articlesWithContent.push({
          ...article,
          excerpt,
          // 必要に応じてMarkdownの全文も保存できます（現在はメタデータのみ）
          // content: content
        });
        console.log(`   ✅ 取得成功`);
      } else {
        console.log(`   ⚠️  スキップ`);
      }
    }
    
    console.log('');
    
    // 日付でソート（新しい順）
    articlesWithContent.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    // 最新3件を取得
    const recentArticles = articlesWithContent.slice(0, 3);
    
    // JSONファイルとして保存
    const output = {
      recentArticles,
      allArticles: articlesWithContent
    };
    
    // 出力ディレクトリを確認
    const outputDir = path.dirname(OUTPUT_FILE);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    
    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(output, null, 2), 'utf-8');
    
    console.log(`✅ 記事データを保存しました: ${OUTPUT_FILE}`);
    console.log(`   - 全記事: ${articlesWithContent.length}件`);
    console.log(`   - 最新記事: ${recentArticles.length}件`);
    console.log('');
    console.log('🎉 完了しました！');
    
  } catch (error) {
    console.error('\n❌ エラーが発生しました:', error.message);
    process.exit(1);
  }
}

// スクリプト実行
main();

