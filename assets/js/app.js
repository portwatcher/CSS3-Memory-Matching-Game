var matchingGame = {}
matchingGame.deck = [
	'cardAK', 'cardAK',
	'cardAQ', 'cardAQ',
	'cardAJ', 'cardAJ',
	'cardBK', 'cardBK',
	'cardBQ', 'cardBQ',
	'cardBJ', 'cardBJ',
];

$(function() {
	matchingGame.deck.sort(shuffle);
	//复制12张牌
	for(var i = 0; i<11; i++) {
		$(".card:first-child").clone().appendTo("#cards");
	}
	//初始化每张牌的位置
	$("#cards").children().each(function(index) {
		//让纸牌以 3 x 4 的格式对齐
		$(this).css({
			"left": ($(this).width() + 20) * (index % 4),
			"top": ($(this).height() + 20) * Math.floor(index / 4)
		});
		
		//从已洗过的牌中获取图案
		var pattern = matchingGame.deck.pop();
		//应用纸牌的背景图案，并让其可见
		$(this).find(".back").addClass(pattern);
		//把图案数据嵌入dom元素中
		$(this).data("pattern", pattern);
		//监听每张纸牌div元素的单击事件
		$(this).click(selectCard);
	});
});

function shuffle() {
	return 0.5 - Math.random();
}

function selectCard() {
	//如果已经翻开了两张牌，直接return跳出函数
	if($(".card-flipped").size() > 1) {
		return;
	}
	
	$(this).addClass("card-flipped");
	//如果已翻开两张，0.7秒钟后检测两张已翻看的牌
	if($(".card-flipped").size() == 2) {
		setTimeout(checkPattern, 700);
		//console.log("ok.");
	}
}

function checkPattern() {
	if(isPatternMatched()) {
		$(".card-flipped").removeClass("card-flipped").addClass("card-removed");
		$(".card-removed").bind("webkitTransitionEnd", removeTookCards);
	}else {
		$(".card-flipped").removeClass("card-flipped");
	}
}

function isPatternMatched() {
	var cards = $(".card-flipped");
	var pattern = $(cards[0]).data("pattern");
	var anotherPattern = $(cards[1]).data("pattern");

	return (pattern == anotherPattern);
}

function removeTookCards() {
	$(".card-removed").remove();
	//判断是否胜利
	if($(".card").size() == 0) {
		alert("You win!Congratulations! :-)");
		location.reload();
	}
}