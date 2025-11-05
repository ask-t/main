# blog-articles リポジトリのセットアップ手順

このファイルは `blog-articles` プライベートリポジトリを作成する際の手順です。

## 1. GitHubでプライベートリポジトリを作成

1. https://github.com/new にアクセス
2. Repository name: `blog-articles`
3. **Private** を選択
4. "Add a README file" にチェックを入れる
5. "Create repository" をクリック

## 2. ローカルにクローン

```bash
git clone git@github.com:YOUR_USERNAME/blog-articles.git
cd blog-articles
```

## 3. テンプレートファイルをコピー

このディレクトリ（`scripts/blog-articles-template/`）の内容を、クローンしたリポジトリにコピーします：

```bash
# メインプロジェクトのルートから実行
cp -r scripts/blog-articles-template/* path/to/blog-articles/
```

または、手動で以下のファイルをコピー：
- `meta.json`
- `articles/` ディレクトリとその中のMarkdownファイル
- `.gitignore`（既存のファイルがあれば上書き）
- `README.md`（既存のREADMEは削除または上書き）

## 4. コミットしてプッシュ

```bash
cd path/to/blog-articles
git add .
git commit -m "Initial setup: Add articles and meta.json"
git push origin main
```

## 5. GitHub Personal Access Token を作成

1. https://github.com/settings/tokens にアクセス
2. "Generate new token (classic)" をクリック
3. Note: `blog-articles-access`
4. Expiration: `No expiration` または適切な期限
5. Scopes: **repo** にチェック（Full control of private repositories）
6. "Generate token" をクリック
7. トークンをコピー（一度しか表示されません！）

## 6. メインプロジェクトに環境変数を設定

メインプロジェクトのルートディレクトリに `.env` ファイルを作成：

```bash
# メインプロジェクトのルートで実行
cp .env.example .env
```

`.env` ファイルを編集して、以下の値を設定：

```env
GITHUB_TOKEN=ghp_xxxxxxxxxxxxxxxxxxxxxxxxx
ARTICLES_REPO_OWNER=YOUR_GITHUB_USERNAME
ARTICLES_REPO_NAME=blog-articles
ARTICLES_REPO_BRANCH=main
```

## 7. 記事を取得してテスト

```bash
# メインプロジェクトで実行
npm run fetch-articles
```

成功すると、`src/data/articles.json` が更新されます。

## 8. ビルドして確認

```bash
npm run build
```

ビルド前に自動的に記事が取得されます。

## トラブルシューティング

### エラー: "GitHub API Error: 404"

- リポジトリ名やオーナー名が正しいか確認
- リポジトリが本当にプライベートか確認
- GitHub Tokenの権限が正しいか確認

### エラー: "GITHUB_TOKEN 環境変数が設定されていません"

- `.env` ファイルが存在するか確認
- `.env` ファイルの内容が正しいか確認
- 環境変数名にタイポがないか確認

### 記事が取得されない

- `meta.json` のフォーマットが正しいか確認
- `articles/` ディレクトリに対応するMarkdownファイルがあるか確認
- ファイル名が `meta.json` の `file` フィールドと一致しているか確認

## 完了！

これで記事を別リポジトリで管理できるようになりました。

新しい記事を追加する場合は：
1. `articles/` にMarkdownファイルを追加
2. `meta.json` に記事情報を追加
3. コミット＆プッシュ
4. メインサイトをビルド（自動的に最新の記事が取得されます）

