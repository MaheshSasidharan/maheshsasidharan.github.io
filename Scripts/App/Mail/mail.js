var sCurrentTile;
var sPreviousTile;
var bRefresh = true;
var imageLinkIndex;
var oImageLinks = {
    1: 'http://i.imgur.com/AyF7p7M.jpg',
    2: 'http://i.imgur.com/AU8zkYg.jpg',
    3: 'http://i.imgur.com/pjl4o3G.jpg',
    4: 'http://i.imgur.com/PIo7Owy.jpg',
    5: 'http://i.imgur.com/SH93hlp.jpg',
    6: 'http://i.imgur.com/frwJMXo.jpg',
    7: 'http://i.imgur.com/eN1EWQj.jpg',
    8: 'http://i.imgur.com/EG4GJp9.jpg',
    9: 'http://i.imgur.com/dwk8MuC.jpg',
    10: 'http://i.imgur.com/vbLLAXZ.jpg',
    11: 'http://i.imgur.com/gkVkFg8.jpg',
    12: 'http://i.imgur.com/AzSh8qJ.jpg',
    13: 'http://i.imgur.com/4hluk7v.jpg',
    14: 'http://i.imgur.com/7BX2zHY.jpg',
    15: 'http://i.imgur.com/G7LMwZJ.jpg',
    16: 'http://i.imgur.com/QBXHTUV.jpg',
    17: 'http://i.imgur.com/vOtjyX5.jpg',
    18: 'http://i.imgur.com/7brxkJW.jpg',
    19: 'http://i.imgur.com/iLYlx6r.jpg',
    20: 'http://i.imgur.com/Vv70pre.jpg'
};

$(document).ready(function () {
    $(".Bottom_Section > .Bottom_Left, .Bottom_Section > .Bottom_Right").css("margin-top", "5px");
    $(".InnerTile > div:not(:first-child)").addClass('hidden');
    $('.Tiles').click(function () {
        if (sCurrentTile === undefined) {
            sCurrentTile = $(this).data('tilecount');
            sPreviousTile = sCurrentTile;
            bRefresh = true;
        }
        else {
            sCurrentTile = $(this).data('tilecount');
            bRefresh = sCurrentTile === sPreviousTile ? false : true;
            sPreviousTile = sCurrentTile;
        }
        if (bRefresh) {
            $('.IN_Title').css('margin-left', '600px').css('margin-left', '0px');
            $(".Bottom_Right_Wrapper").html($(this).find(".hidden").html());
            $(".Bottom_Left_Wrapper").find(".Bottom_LeftShow").removeClass('Bottom_LeftShow').addClass('Bottom_LeftHide');
            $(".InnerTile").click(function () {
                $(this).css('border-color', 'black').css('color', 'red').addClass('InnerTileAnimationClick');
                $(".Bottom_Left_Wrapper").html($(this).find(".hidden")[0].outerHTML);
                imageLinkIndex = $(this).find(".hidden").data('innertilecount');
                $(".Bottom_Left_Wrapper").find(".hidden").removeClass('hidden').addClass('Bottom_LeftShow');
                $(".Bottom_LeftShow").css('background', "url(" + oImageLinks[imageLinkIndex] + ") no-repeat").css('background-size', 'contain');
            });
        }
    });
});
