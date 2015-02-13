#target illustrator 



/**
 *  ダイアログを表示
 *  @param[in]  artboardNum     アートボードの数
 *  @param[in]  artboardIndex   現在アクティブのアートボード
 *  @return     Object型
 *              enableBoard     : Array<boolean> アートボードの数の長さを持ったboolean配列。
 *              dpi             : number         dpi値
 */
function showOptionDialog(artboardNum, artboardIndex){
    var doFlag = true;
    var dialog = new Window('dialog','レイヤーをPNGで保存',[0,0,340,150]);
    dialog.center();
    
    dialog.text1         = dialog.add("statictext", [20,20,140,40]   , "対象のアートボード");
    dialog.text1.justify = "right";
    dialog.artboards     = dialog.add("edittext"  , [160,20,320,40]  , artboardIndex);
    dialog.allBoard      = dialog.add('checkbox'  , [160,45,320,65]  , 'すべてのアートボード')

    dialog.text2         = dialog.add("statictext", [20,70,140,90]  , "DPI")
    dialog.text2.justify = "right";
    dialog.dpi           = dialog.add("edittext"  , [160,70,320,90] , "72");

    dialog.okBtn         = dialog.add("button"    , [70 ,110,160,110+25]  , "作成", { name:"ok"});
    dialog.cancelBtn     = dialog.add("button"    , [180,110,270,110+25] , "キャンセル", {name: "cancel"});

    // キャンセルボタンが押されたらキャンセル処理（ESCキー含む）
    dialog.cancelBtn.onClick = function() {
        doFlag = false;
        dialog.close();
    }

    dialog.allBoard.onClick = function() {
        dialog.artboards.enabled = !dialog.allBoard.value;
    }

    // ダイアログを表示
    dialog.show();

    // キャンセルした場合
    if(!doFlag){ return null; }

    var enableList    = [];
    var i;
    enableList.length = artboardNum;

    if(dialog.allBoard.value){
        for(i = artboardNum-1 ; i >= 0; i-- ){
            enableList[i] = true;
        }    
    }else{
        for(i = artboardNum-1 ; i >= 0; i-- ){
            enableList[i] = false;
        }

        vals = dialog.artboards.text.split(",");
        for( i = 0 ; i < vals.length ; i ++ ){
            if( vals[i].length == 0 ){ continue; }
            nums = vals[i].split("-");

            if(nums.length == 1){
                enableList[parseInt(nums[0])] = true;
            }else if(nums.length == 2 ){
                var begin, end;

                if(nums[0].length == 0){ begin = 0 }
                else { begin = parseInt(nums[0]); }

                if(nums[1].length == 0){ end = artboardNum; }
                else { end = parseInt(nums[1]); }

                if(begin > end){
                    var p = end;
                    end   = begin;
                    begin = p;
                }
                if(begin < 0){ begin = 0;}
                if(end > artboardNum-1 ){
                    end = artboardNum-1;
                }

                for(var j = begin ; j <= end ; j++ ){
                    enableList[j] = true;
                }
            }
        }
    }

    var str = ""
    for( i = 0 ; i < enableList.length ; i++){
        str += i + ":" + enableList[i] + "\n";
    }
    return {
        enableBoard : enableList,
        dpi         : parseInt(dialog.dpi.text)
    };
}




/**
 *  全てのレイヤーを非表示にする
 *  @param[in] document     対象ドキュメント
 */
function hideAllLayers(document){
    forEach(document.layers, function(layer) {
        layer.visible = false;
    });
}


/**
 *  全てのレイヤーを表示する
 *  @param[in] document     対象ドキュメント
 */
function showAllLayers(document)
{
    forEach(document.layers, function(layer) {
        layer.visible = true;
    });　　　　
}



function forEach(collection, fn)
{
    var n = collection.length;
    for(var i=0; i<n; ++i)
    {
        fn(collection[i]);
    }
}


function numPadding(num, dig){
    return ( '00000000000000' + num ).slice(-dig);
}

/**
 *  メイン
 *  @param[in]  アクティブドキュメント
 */
function main(document){
    if(!document){ return; }

    var defaultArtboard = document.artboards.getActiveArtboardIndex();

    // オプションダイアログ表示
    var setting = showOptionDialog( document.artboards.length , defaultArtboard );
    if(setting === null ){ return; }

    // 保存ディレクトリの選択
    var folder = Folder.selectDialog();
    if(!folder){ return; }
    
    var options = new ExportOptionsPNG24();
    options.antiAliasing     = true;
    options.transparency     = true;
    options.artBoardClipping = true;
    options.verticalScale    = options.horizontalScale = (setting.dpi/72) * 100;

    for(var lc=0; lc<document.layers.length ; lc++){

        hideAllLayers(document);
        var layer = document.layers[lc];
        layer.visible = true;

        for(var bc=0; bc<document.artboards.length ; bc++){
            if(!setting.enableBoard[bc]){ continue; }
            document.artboards.setActiveArtboardIndex(bc);

            var file = new File(folder.fsName + "/"
                + numPadding(bc,2) + "_" + numPadding(lc,4)
                + "_" +layer.name+".png");
            document.exportFile(file,ExportType.PNG24,options);
        }
    }

    showAllLayers(document);
    document.artboards.setActiveArtboardIndex(defaultArtboard);

    alert("書き出しが完了しました");
}


try{
    main(app.activeDocument);
}catch(e){
    alert(e);
}
