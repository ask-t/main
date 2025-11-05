# Blog Articles Repository

このリポジトリは ask-t のポートフォリオサイトの記事を管理するためのものです。

## 📁 ディレクトリ構造

```
blog-articles/
├── README.md           # このファイル
├── meta.json          # 記事のメタデータ
└── articles/          # 記事のMarkdownファイル
    ├── 2024-01-building-scalable-react-applications.md
    ├── 2024-01-design-systems-in-practice.md
    └── ...
```

## 📝 記事の追加方法

### 1. Markdownファイルを作成

`articles/` ディレクトリに新しい記事を作成します。

**ファイル名の規則**: `YYYY-MM-slug.md`
- 例: `2024-03-typescript-best-practices.md`

**記事の内容**:
```markdown
# タイトル

ここから本文を書きます...

## セクション1

内容...

## セクション2

内容...
```

### 2. meta.json を更新

`meta.json` に記事の情報を追加します：

```json
{
  "articles": [
    {
      "title": "記事のタイトル",
      "slug": "記事のスラッグ（URLで使用）",
      "file": "2024-03-slug.md",
      "date": "2024-03-15",
      "readTime": "8 min read",
      "tags": ["Tag1", "Tag2", "Tag3"],
      "excerpt": "記事の要約（省略可能）",
      "image": "画像のURL（省略可能）"
    }
  ]
}
```

### 3. 変更をコミット＆プッシュ

```bash
git add .
git commit -m "Add new article: タイトル"
git push
```

メインサイトをビルドすると、自動的に最新の記事が反映されます！

## 🎨 フィールドの説明

| フィールド | 必須 | 説明 | 例 |
|----------|------|------|-----|
| `title` | ✅ | 記事のタイトル | "Building Scalable React Applications" |
| `slug` | ✅ | URL用のスラッグ | "building-scalable-react-applications" |
| `file` | ✅ | Markdownファイル名 | "2024-01-building-scalable-react-applications.md" |
| `date` | ✅ | 公開日（YYYY-MM-DD） | "2024-01-15" |
| `readTime` | ✅ | 読了時間の目安 | "8 min read" |
| `tags` | ✅ | タグの配列 | ["React", "Architecture"] |
| `excerpt` | ❌ | 要約（省略時は自動生成） | "Learn how to structure React apps..." |
| `image` | ❌ | アイキャッチ画像のURL | "https://example.com/image.png" |

## 💡 Tips

- **タグの付け方**: 3〜5個程度が適切です
- **読了時間**: 一般的に200単語/分で計算します
- **画像**: 横長（16:9または2:1）の画像が推奨です
- **スラッグ**: 小文字とハイフンのみを使用してください

## 🚀 自動化

メインサイトのビルド時（`npm run build`）に、このリポジトリから最新の記事データが自動的に取得されます。

手動で記事を更新したい場合は、メインリポジトリで以下を実行：
```bash
npm run fetch-articles
```

