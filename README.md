#レイヤー別にPNGを書き出し
Adobe Illustrator用 JSXスクリプト

###概要
Illustratorで作成したファイルをレイヤー別にPNGを保存するプラグインです。  
  
![GUI Image](https://github.com/kazu1107/ai-jsx-pngl/blob/master/images/gui.png)
  
###インストール

1. スクリプトフォルダーにjsxファイルをコピーする  
    + Illustrator CC 2014 for Mac の場合  
      `/Applications/Adobe Illustrator CC 2014/Presets.localized/ja_JP/スクリプト/`

2. Illustratorを再起動する  


###使い方
1. メニューの`ファイル → スクリプト → レイヤー別にPNGを書き出し`を選択  

    ![GUI Image](https://github.com/kazu1107/ai-jsx-pngl/blob/master/images/menu.png)  

2. 書き出すアートボード、DPIを指定し作成ボタンを押す  
    アートボードの指定は、書き出しダイアログと同じく範囲指定とページ指定に対応しています  
    
    + `1-10` (1から10まで)  
    + `2,3`（2と3)
    + `1-4,6,8` 範囲指定と個別指定の複合

    ![GUI Image](https://github.com/kazu1107/ai-jsx-pngl/blob/master/images/gui.png)  

3. 書き出し先フォルダーを選択


###使用例
２つのレイヤーにそれぞれ前面・後面オブジェクトがある場合、  

![GUI Image](https://github.com/kazu1107/ai-jsx-pngl/blob/master/images/sample-00a.png)  
  
以下のような画像が生成されます。  
  
![GUI Image](https://github.com/kazu1107/ai-jsx-pngl/blob/master/images/sample-00b.png)  
