---
sidebar_position: 2
sidebar_label: Writing Guide
---


# Writing ガイド

このドキュメントでは、ask-tのポートフォリオサイトでブログ記事とプロジェクト情報を更新する方法について説明します。

## 目次

1. [ブログ記事の更新方法](#ブログ記事の更新方法)
2. [プロジェクト情報の更新方法](#プロジェクト情報の更新方法)
3. [画像の追加方法](#画像の追加方法)
4. [著者情報の更新方法](#著者情報の更新方法)
5. [タグの管理方法](#タグの管理方法)
6. [プロファイル情報の更新方法](#プロファイル情報の更新方法)

## ブログ記事の更新方法

### 1. 記事データの更新

ブログ記事の情報は `src/data/articles.json` ファイルで管理されています。

#### ファイル構造
```json
{
  "recentArticles": [
    // 最近の記事（ホームページに表示される）
  ],
  "allArticles": [
    // 全ての記事（ブログページに表示される）
  ]
}
```

#### 新しい記事を追加する手順

1. `src/data/articles.json` を開く
2. 適切なセクション（`recentArticles` または `allArticles`）に新しい記事オブジェクトを追加

```json
{
  "title": "記事のタイトル",
  "excerpt": "記事の要約文（2-3行程度）",
  "date": "2024-01-20",
  "readTime": "8 min read",
  "tags": ["タグ1", "タグ2", "タグ3"],
  "slug": "article-url-slug",
  "image": "/images/gallery/image1.png"
}
```

#### フィールドの説明

- **title**: 記事のタイトル
- **excerpt**: 記事の要約文（ホームページやブログ一覧で表示）
- **date**: 公開日（YYYY-MM-DD形式）
- **readTime**: 読了時間の目安
- **tags**: 記事のタグ（配列形式）
- **slug**: URLに使用されるスラッグ（英数字とハイフンのみ）
- **image**: 記事のサムネイル画像パス

### 2. 記事の順序管理

- `recentArticles`: 最新の記事が上に来るように並べる
- `allArticles`: 時系列順（新しい順）で並べる

### 3. 既存記事の更新

既存の記事を更新する場合は、該当する記事オブジェクトの内容を編集します。

## プロジェクト情報の更新方法

### 1. プロジェクトデータの更新

プロジェクト情報は `src/data/projects.json` ファイルで管理されています。

#### ファイル構造
```json
{
  "featuredProjects": [
    // 注目プロジェクト（ホームページに表示される）
  ],
  "allProjects": [
    // 全てのプロジェクト（プロジェクトページに表示される）
  ]
}
```

#### 新しいプロジェクトを追加する手順

1. `src/data/projects.json` を開く
2. 適切なセクション（`featuredProjects` または `allProjects`）に新しいプロジェクトオブジェクトを追加

```json
{
  "title": "プロジェクト名",
  "description": "プロジェクトの詳細説明（2-3行程度）",
  "tags": ["タグ1", "タグ2", "タグ3"],
  "role": "担当役割",
  "stack": ["技術1", "技術2", "技術3"],
  "image": "/images/gallery/image1.png",
  "link": "https://project-demo.com",
  "github": "https://github.com/username/project"
}
```

#### フィールドの説明

- **title**: プロジェクト名
- **description**: プロジェクトの詳細説明
- **tags**: プロジェクトのタグ（配列形式）
- **role**: プロジェクトでの担当役割
- **stack**: 使用技術スタック（配列形式）
- **image**: プロジェクトの画像パス
- **link**: デモサイトのURL（オプション）
- **github**: GitHubリポジトリのURL（オプション）

### 2. プロジェクトの順序管理

- `featuredProjects`: 最も重要なプロジェクトを上に配置
- `allProjects`: 時系列順または重要度順で並べる

## 画像の追加方法

### 1. 画像の配置場所

画像は `static/images/gallery/` ディレクトリに配置します。

```
static/images/gallery/
├── image1.png
├── image2.png
├── image3.png
├── image4.png
├── image5.png
└── image6.png
```

### 2. 新しい画像を追加する手順

1. 画像ファイルを `static/images/gallery/` に配置
2. ファイル名は `image[番号].png` の形式で命名
3. 記事やプロジェクトの `image` フィールドで参照

```json
"image": "/images/gallery/image7.png"
```

### 3. 画像の最適化

- 推奨サイズ: 800x600px または 1200x800px
- ファイル形式: PNG または JPG
- ファイルサイズ: 500KB以下を推奨

## 著者情報の更新方法

### 1. 著者データの更新

著者情報は `blog/authors.yml` ファイルで管理されています。

```yaml
ask-t:
  name: ask-t
  title: Frontend Developer & Designer
  url: https://github.com/asktakahashi
  image_url: https://github.com/asktakahashi.png
  page: true
  socials:
    github: asktakahashi
    linkedin: asktakahashi
```

### 2. 新しい著者を追加する手順

1. `blog/authors.yml` を開く
2. 新しい著者エントリを追加

```yaml
new-author:
  name: 著者名
  title: 肩書き
  url: プロフィールURL
  image_url: プロフィール画像URL
  page: true
  socials:
    github: GitHubユーザー名
    linkedin: LinkedInユーザー名
    x: Twitterユーザー名
```

## タグの管理方法

### 1. タグデータの更新

タグ情報は `blog/tags.yml` ファイルで管理されています。

```yaml
react:
  label: React
  permalink: /react
  description: React関連の記事

typescript:
  label: TypeScript
  permalink: /typescript
  description: TypeScript関連の記事
```

### 2. 新しいタグを追加する手順

1. `blog/tags.yml` を開く
2. 新しいタグエントリを追加

```yaml
new-tag:
  label: 表示名
  permalink: /new-tag
  description: タグの説明
```

## プロファイル情報の更新方法

### 1. プロファイルデータの更新

プロファイル情報は `src/data/profile.json` ファイルで管理されています。

#### スキル情報の更新
```json
"skills": [
  { "name": "スキル名", "level": "レベル" }
]
```

レベル: `Expert`, `Advanced`, `Intermediate`, `Beginner`

#### 経験情報の更新
```json
"experience": [
  {
    "company": "会社名",
    "role": "役職",
    "period": "期間",
    "description": "説明"
  }
]
```

#### プロファイルプロジェクトの更新
```json
"profileProjects": [
  {
    "title": "プロジェクト名",
    "description": "説明",
    "tech": ["技術1", "技術2"],
    "link": "URL"
  }
]
```

## 更新後の確認事項

### 1. 開発サーバーでの確認

```bash
npm start
```

### 2. ビルドテスト

```bash
npm run build
```

本番環境でのビルドが正常に完了することを確認

### 3. チェックリスト

- [ ] JSONファイルの構文が正しい
- [ ] 画像パスが正しく設定されている
- [ ] 日付形式が正しい（YYYY-MM-DD）
- [ ] タグが適切に設定されている
- [ ] リンクが正しく設定されている

## トラブルシューティング

### よくある問題

1. **JSON構文エラー**
   - カンマの忘れや括弧の不整合をチェック
   - JSONバリデーターを使用して確認

2. **画像が表示されない**
   - 画像パスが正しいか確認
   - 画像ファイルが存在するか確認

3. **タグが表示されない**
   - `blog/tags.yml` にタグが定義されているか確認
   - 記事のタグ名と一致しているか確認

### サポート

問題が解決しない場合は、以下のリソースを参照してください：

- [Docusaurus公式ドキュメント](https://docusaurus.io/docs)
- [JSON構文チェッカー](https://jsonlint.com/)
- [Markdown記法ガイド](https://www.markdownguide.org/)

---

このガイドに従って、効率的にコンテンツを更新してください。質問や問題がある場合は、プロジェクトのメンテナーに連絡してください。
