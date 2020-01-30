# MP3Tags

WSH(JScript)でのMP3ファイルタグ解析ライブラリです。
MP3のファイルパスを渡すと、MP3タグがobjectで返却されます。
サムネイル（APIC）についてはBASE64エンコードを施した情報が格納されるので、imgタグのsrcにそのまま挿入すれば表示することができます。
htaアプリケーションでMP3タグ解析を行いたかったため、MP3のタグ仕様を参考に実装しました。

## Usage

ライブラリを読み込み。
```html
<script type="text/jscript" src="./mp3tags.js"></script>
```

JScriptから呼び出し。
```js
var tags = mp3tags('MP3ファイルのパス');
```

## Demo

main.htaを実行。
