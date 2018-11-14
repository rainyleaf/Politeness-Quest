/*
Made by Torri Raines and Zak Thompson
tr646111@ohio.edu
11/28/16
*/
var helpInfo = "Welcome to Politeness Quest. You are a new English teacher in a Japanese university. Today is your orientation day and you have the opportunity to explore the department and meet your colleagues. To survive in Japan, you will need to be able to communicate in Japanese. Type in Hiragana and Katakana and don't forget to be polite!"

function Game(){
	this.draw = function(){
		var embarrassmentProgress = document.getElementById("embarrassmentMeterFilling")
		var embarrassmentPercent = 10 * this.player.embarrassment
		if (embarrassmentPercent > 100){
			embarrassmentPercent = 100;
		}
		embarrassmentProgress.style.width = embarrassmentPercent + "%"
		console.log(embarrassmentPercent + "%")
		this.stateStack[this.stateStack.length - 1].draw()

	}
	this.getUserInput = function(){
		var inputFromBox = document.getElementById("userInput")
		var inputFromPlayer = inputFromBox.value
		inputFromBox.value = ""
		/*if (inputFromBox == "/help"){
			alert(helpInfo)
		}
		if (inputFromBox == "/planner"){
			alert("planner text")
		} 
		inputFromBox.strip(string.punctuation)
		inputFromBox.
		*/
		
		return inputFromPlayer
	}
	this.update = function(userInput){
		this.stateStack[this.stateStack.length - 1].update(userInput)
	}
	this.play = function(){
		var cleanedInput = this.getUserInput()
		this.update(cleanedInput)
		this.draw()
	}
	this.stateStack = []
	var titleScreen = new TitleScreen(this)
	this.stateStack.push(titleScreen)
	this.player = new Player("name", "city", "homestate")
}

function CreditsScreen(game){
	this.game = game
	this.update = function(userInput){
	}
	this.draw = function(){
		//var br = document.createElement("br")
		var displayedText = document.getElementById("displayedText")
		displayedText.innerHTML = ""
		displayedText.appendChild(document.createTextNode("Thank you for playing Politeness Quest!"))
		displayedText.appendChild(document.createElement("br"))
		displayedText.appendChild(document.createElement("br"))
		displayedText.appendChild(document.createTextNode("Credits:"))
		displayedText.appendChild(document.createElement("br"))
		displayedText.appendChild(document.createTextNode("Game designer: Torri Raines"))
		displayedText.appendChild(document.createElement("br"))
		displayedText.appendChild(document.createTextNode("Writers: Torri Raines and Naomi Otsuji"))
		displayedText.appendChild(document.createElement("br"))
		displayedText.appendChild(document.createTextNode("Translator: Naomi Otsuji"))
		displayedText.appendChild(document.createElement("br"))
		displayedText.appendChild(document.createTextNode("Senior code consultant: Zak Thompson <3"))
	}
}

function EpilogueScreen(game){
	this.game = game
	var bestEpilogue = 'The pizza arrives and you confidently answer the door. ' +
		'You\'ve had a long day, but you\'re feeling energized and ready to start your new job and life in Japan. '
	var goodEpilogue = 'The pizza arrives and Naomi answers the door for you.' +
		'You\'ve had a couple of blunders here and there, but who doesn\'t? You\'re nervous but excited for the next day. '
	var decentEpilogue = 'You go to your room and sprawl on your bed. You let out a sigh. ' +
		'It\'s been a hectic day. You\'re nervous to go back to the university the next day to start teaching. '
	var notGreatEpilogue = 'You retreat to your room and collapse on your bed. You cover your face with your hands. ' +
		'You survived, but barely. You steel yourself for tomorrow and try to put the nerves out of your mind.'
	this.update = function(userInput){
		game.stateStack.push(new CreditsScreen(game))
	}
	this.draw = function(){
		var deanCompleted = game.stateStack[game.stateStack.length - 2].deanCompleted
		var officeCompleted = game.stateStack[game.stateStack.length - 2].officeCompleted
		var homeCompleted = game.stateStack[game.stateStack.length - 2].homeCompleted
		if(deanCompleted && officeCompleted && homeCompleted && game.player.embarrassment <= 5){
			var displayedText = document.getElementById("displayedText")
			displayedText.innerHTML = ""
			var displayedTextNode = document.createTextNode(bestEpilogue)
			displayedText.appendChild(displayedTextNode)
		}
		else if(deanCompleted && officeCompleted && homeCompleted && game.player.embarrassment > 5){
			var displayedText = document.getElementById("displayedText")
			displayedText.innerHTML = ""
			var displayedTextNode = document.createTextNode(goodEpilogue)
			displayedText.appendChild(displayedTextNode)
		}
		else if(game.player.embarrassment <= 5){
			var displayedText = document.getElementById("displayedText")
			displayedText.innerHTML = ""
			var displayedTextNode = document.createTextNode(decentEpilogue)
			displayedText.appendChild(displayedTextNode)
		}
		else{
			var displayedText = document.getElementById("displayedText")
			displayedText.innerHTML = ""
			var displayedTextNode = document.createTextNode(notGreatEpilogue)
			displayedText.appendChild(displayedTextNode)
		}
	}
}

function TitleScreen(game){
	this.game = game
	this.phase = 0 
	this.questions = ["", helpInfo + " Press enter to get started.", "What is your name?", "What state are you from?", "What city are you from?", "Press enter to start your day."]
	this.update = function(userInput){
		var displayedText = document.getElementById("displayedText")
		displayedText.innerHTML = ""
		if (this.phase == 0){
			++this.phase
		}
		else if (this.phase == 1){
			++this.phase
		}
		else if (this.phase == 2){
			if(userInput != ""){
				this.game.player.name = userInput
				++this.phase
			}
			else {
				displayedText.appendChild(document.createTextNode("Try again! Please enter something in the box.\n\n"))
			}
		}
		else if (this.phase == 3){
			if(userInput != ""){
				this.game.player.homestate = userInput
				++this.phase
			}
			else {
				displayedText.appendChild(document.createTextNode("Try again! Please enter something in the box.\n\n"))
			}
		}
		else if (this.phase == 4){
			if(userInput != ""){
				this.game.player.city = userInput
				displayedText.appendChild(document.createTextNode("Hello, " + this.game.player.name + " from " + this.game.player.city + ", " + this.game.player.homestate + ". "))
				++this.phase
			}
			else {
				displayedText.appendChild(document.createTextNode("Try again! Please enter something in the box.\n\n"))
			}
		}
		else if (this.phase == 5){
			this.game.stateStack.push(new InPlay(this.game))
		}
	}
	this.draw = function(){
		var displayedText = document.getElementById("displayedText")
		var displayedTextNode = document.createTextNode(this.questions[this.phase])
		displayedText.appendChild(displayedTextNode)
	}
}

function InPlay(game){
	this.game = game
	this.rooms = []
	this.officeCompleted = false
	this.deanCompleted = false
	this.homeCompleted = false
	this.phase = 99
	nakamura = [
		"You go to your new office with your new key. You open the door and see a woman sitting at the desk.\nYou should introduce yourself.",
		"はじめまして。 なかむら　です。 あたらしい せんせい ですか。",
		"どの くらすを ごたんとう されるのですか。",
		"ああ、そうですか。おしえるのは　はじめてですか。",
		"あ、そうですか。だいがくは どちらですか。",
		"あ、そうですか。すみません。ちょっと。 きいたことが　ありません。　がくせい　いすうは？",
		"あせんずの ごしゅっしんですか。",
		"ああ、そうですか。じつは　 あめりかに いちども いったことがないんです。　アセンズは　 どうでしたか。　おすきでしたか。",
		"そうですか。こちらも たのしめると いいですね。　ごめんなさい。　かいぎが あるので...　いかないと... しつれいします。"
		//"そうなんですか。どうして ですか。",
		//"そうなんですか。では、こちらは たのしめると いいですね。 ごめんなさい。　かいぎが あるので...　いかないと... しつれいします。"
	]
	officeAnswers = [
		"こんにちは。　" + game.player.name + "　です。はじめまして。",
		"はい、そうです。",
		"ちゅうきゅう えいご です。",
		"いいえ、そつぎょうした　だいがくで おしえていました。",
		"おはいお だいがく です。おはいおの アセンズに　あります。",
		"そうですね。がくせいすうは　さんまんにん くらい ですね。",
		"いいえ、わたしは" + game.player.city + "の " + game.player.homestate + "の しゅっしんです。",
		"はい、そうですね。すきでしたね。でも、いまは　にほんのせいかつに わくわく していますね。",
		"あ、そうですか。 では、また、のちほど。"
		//"ちょっと つまらない　まち　なんですよ。.",
		//"あ、そうですか。 では、また、のちほど。"
	]
	officeHints = [
		"Good afternoon. I’m " + game.player.name + ". Nice to meet you.",
		"Yes.",
		"Intermediate English.",
		"No, I taught at my university.",
		"Ohio University in Athens, Ohio.",
		"There’s around 30,000 students.",
		"No, I’m from " + game.player.city + "in " + game.player.homestate + ".",
		"Yes, I like it, but I’m excited to experience Japan.",		//this one [7] and [9] are either-or options
		"Nice to meet you, see you later."
		//"It’s a bit boring.",
		//"Nice to meet you, see you later."
	]
	officeKeywords = [
		[game.player.name, "です", "はじめまして"],
		["はい"],
		["ちゅうきゅう", "えいご"],
		["いいえ"],
		["オハイオ", "だいがく", "の", "アセンズ", "に"],
		["がくせい", "さんまんにん"],
		["いいえ"],	// game.player.city, "の", "しゅっしん", "です"],
		["はい"],	// "でも", "にほん", "わくわく"],
		["また", "のちほど"]
		//
		//
	]
	//16 lines
	yamamoto_and_takahashi = [
		"You decide to introduce yourself to the Dean of the English Department. You knock on the office door. Press space and then press enter to continue",
		"やまもと:	はい、どうぞ。",
		"やまもと:	こんにちは。",
		"やまもと:	" + game.player.name + "せんせいですか。はじめまして。ひしょのやまもとともうします。どうぞよろしくおねがいいたします。",
		"やまもと:	いまがくぶちょうをおよびしますので、おかけになっておまちいただけますか？",
		"たかはし:	あー、どうも、どうも。おまたせしてすみません。がくぶちょうのたかはしです。",		//dean speaking
		"たかはし:	" + game.player.name + "せんせい。どうぞよろしくおねがいします。",		//dean 2
		"たかはし:	" + game.player.name + "せんせいはにほんははじめてですか？",		//dean 3
		"たかはし:	そうですか。" + game.player.name + "せんせいはあめりかごしゅっしんでしたよね。どうですか、にほんはあめりかとちがいますか？",
		"たかはし:	そうですか。 ところで、こんばん" + game.player.name + "せんせいのかんげいかいをしようとはなしていたんですが、ごつごうはどうですか？",		//dean 5
		"たかはし:	きゅうでわるいんだけど。",	//dean 6
		"たかはし:	そうですか。では、またこんど。 The dean leaves. Press enter and then space to continue.",  //branching, if the player responds ["ありがと" "うございます"]
		//The dean says "great!" and leaves. Get this from naomi
		"やまもと:	" + game.player.name + "せんせい、このあと、おひるごはんをいっしょにたべませんか？",		//secretary part 2
		"やまもと:	なにがおすきですか？",
		"やまもと:	なにかにがてなものはありますか？",
		//"やまもと:	そうですか。",	not using this one
		"やまもと:	そうですか。では、おいしいおすしやさんがあるので、そこにいきましょうか。",
		"やまもと:	おさしみもありますよ。"
	]

	dean_answers = [
		"",
		"しつれいいたします。",
		"こんにちは。はじめまして。きょうからおせわになります、トリともうします。どうぞよろしくおねがいいたします。",
		"どうぞよろしくおねがいいたします。",
		"はい、ありがとうございます。",
		"はじめまして。ほんじつよりおせわになりますトリともうします。",
		"こちらこそ、どうぞよろしくおねがいいたします。",
		"はい、はじめてです。",
		"はい、そうですね。", //branching : "いえ、そんなに・・・"
		"こんばんですか",
		"すみません。 こんばんは、ちょっと・・・。",	//branching: "ありがとうございます。ぜひ、おねがいします。"
		"",
		"いいですね。ありがとうございます。",
		"すし",	//liked food
		"なにも",	//disliked food
		"おさしみはありますか",
		"いいですね。いきましょう。"
	]

	dean_keywords = [
		[""],
		["しつれい", "します"],
		[game.player.name, "ともう", "します"],
		["どうぞ", "よろしく", "おねがい", "します"],
		["ありがとう", "ございます"],				//response to trigger dean's entry
		["はじめまして", game.player.name, "ともう", "します"],			//dean 1
		["こちらこそ", "どうぞ", "よろしく", "おねがい", "します"],		//dean 2
		["はい"],											//dean 3
		["はい"],	// branching: "いえ" (does not affect dean's response)
		["こんばん", "ですか"],			//dean 5
		["ちょっと"], //branching: ["ありがと" "うございます"]		//dean 6
		[""],	//dean leaves
		["いい", "ですね"],				//secretary part 2
		["すし"],	//list of foods person might like
		["なにも"],	//list of foods person might not like, not including sushi or sashimi
		["さしみ", "ありますか"],
		["いきましょう"]
	 ]
		
	dean_hints = [
		"Press space and then press enter.",
		"Excuse me.",
		"Hello. Nice to meet you. I am " + game.player.name + ". (be polite!)",
		"Nice to meet you. (lit.: 'let's have a good relationship')",
		"Yes, thank you very much.",
		"Nice to meet you (for the first time). I am " + game.player.name + ".",
		"It is I who should say so. Nice to meet you. (lit.: 'let's have a good relationship')",
		"Yes, it is.",
		"Yes, it is.",	//branching "No, it is not, actually."
		"This evening?",
		"I’m sorry, but…this evening…",	//branching: "Okay, thank you..."
		"The dean left. Press enter and then space to continue.",
		"Sounds good. Thank you.",
		"Sushi.",	//add other foods (liked)
		"Nothing.",		//add disliked foods
		"Do they have sashimi?",
		"Sounds good. Let’s go."
	]

	//15 lines
	naomi_and_pizza = [
		"You return to your apartment where you live with your Japanese friend, Naomi. Press space and then press enter.",
		"なおみ:	おかえりなさい。",
		"なおみ:	" + game.player.name + " 、きょう、どうだった？",
		"なおみ:	にほんのだいがくはどう？",
		"なおみ：	へえ。よかったね。みんなどんな人？",
		"なおみ：	よかった。おなかすいた？",
		"なおみ：	なにたべる？",
		"なおみ：	いいね。じゃあ、" + game.player.name + "、ピザハットにでんわして、チーズピザをたのんで。",
		"You make a phone call to order a pizza.\nピザハット：	おでんわありがとうございます。ピザハットです。",
		"ピザハット：	はい。ごちゅうもんは？",
		"ピザハット：	はい。サイズはどうされますか？",
		"ピザハット：	はい。きじはどうされますか？",
		"ピザハット：	はい。ごいっしょにおのみものはいかがですか？",
		"ピザハット：	かしこまりました。では、おなまえ、ごじゅうしょ、おでんわばんごうをおねがいします。",
		"ピザハット：	ごちゅうもんありがとうございました。"
	]

	naomi_answers = [
		"",
		"ただいま。",
		"おもしろかった",
		"まあまあ。 オフィスメイトのせんせいと、がくぶちょうと、ひしょにあったよ。それで、ひしょとおひるごはんをいっしょにたべたよ。",
		"みんなしんせつ。",
		"すいた",
		"ピザは？",
		"オッケー。",
		"すみません、ピザのデリバリーをおねがいします。",
		"チーズピザをおねがいします。",
		"エムサイズでおねがいします。",
		"パンピザでおねがいします。",
		"いえ、けっこうです。",
		"なまえは、"+ game.player.name + "です。じゅうしょはきょうとしなかぎょうぐです。でんわばんごうは090-123-4567です。",
		"ありがとう。"
	]

	naomi_keywords = [
		[""],
		["ただいま"],
		["おもしろかった"],
		["オフィスメイト", "の", "せんせい", "と", "がく", "ぶちょう", "と", "ひしょ", "にあったよ"],
		["しんせつ"],
		["すいた"],
		["ピザ"],
		["オッケー"],
		["おねがいします", "デリバリ"],
		["チーズ", "ピザ", "おねがいします"],
		["エム", "サイズ", "おねがいします"],
		["パン", "ピザ", "おねがいします"],
		["いえ"],
		["なまえは", game.player.name, "です", "じゅうしょ", "きょうとし", "なかぎょうく", "です", "でんわ", "ばんごう", "090-123-4567", "です"],
		["ありがとう"]
	]

	naomi_hints = [
		"Press enter.",
		"I’m home.",
		"Interesting.",
		"So-so. I met my officemate (sensei) and the dean and his secretary. Then, I ate lunch with the secretary.",
		"All are nice.",
		"I am.",
		"How about pizza?",
		"OK.",
		"Excuse me. I’d like to order a pizza for delivery.",
		"Cheese pizza please.",
		"M-size please.",
		"Pan pizza please.",
		"No, thank you.",
		"My name is " + game.player.name + ". My address is Nakagyo-ku, Kyoto-shi. My phone number is 090-123-4567.",
		"Thank you."
	]
	var yourOffice = new Room("Your office", nakamura, officeAnswers, officeHints, officeKeywords)
	this.rooms.push(yourOffice)
	var deansOffice = new Room("The Dean's office", yamamoto_and_takahashi, dean_answers, dean_hints, dean_keywords)
	this.rooms.push(deansOffice)
	var yourApartment = new Room("Your apartment", naomi_and_pizza, naomi_answers, naomi_hints, naomi_keywords)
	this.rooms.push(yourApartment)
	this.draw = function(){
		var displayedText = document.getElementById("displayedText")
		if (this.phase >= this.rooms[this.game.player.currentroom].questions.length){
			displayedText.appendChild(document.createTextNode("Where would you like to go? Click a room button in the bottom-left corner."))
			var yourOfficeButton = document.getElementById("yourOfficeButton")
			var deansOfficeButton = document.getElementById("deansOfficeButton")
			var goHomeButton = document.getElementById("goHomeButton")
			if (!this.officeCompleted){
				yourOfficeButton.disabled = false
			}
			if (!this.deanCompleted){
				deansOfficeButton.disabled = false
			}
			if (!this.homeCompleted){
				goHomeButton.disabled = false
			}
			return
		}
		else if (this.game.player.embarrassment >= 10){
			displayedText.innerHTML = ""
			displayedText.appendChild(document.createTextNode("You've died of embarrassment. Game over. Refresh the page to try again."))
			return
		}
		else if (this.game.player.embarrassment < 10){
			document.getElementById("yourOfficeButton").disabled = true
			document.getElementById("deansOfficeButton").disabled = true
			document.getElementById("goHomeButton").disabled = true
			var displayedTextNode = document.createTextNode(this.rooms[this.game.player.currentroom].questions[this.phase])
			displayedText.appendChild(displayedTextNode)
		}
	}
	this.update = function(userInput){
		var displayedText = document.getElementById("displayedText")
		displayedText.innerHTML = ""
		var correct = false
		if(userInput != ""){
			if (userInput == this.rooms[this.game.player.currentroom].answers[this.phase]){
				++this.phase
				if (this.game.player.embarrassment > 0){
					--this.game.player.embarrassment
				}
				correct = true
			}
			//else if (userInput != this.rooms[this.game.player.currentroom].answers[this.phase]){
				//for (var i = this.phase; i < this.rooms[this.game.player.currentroom].answers[this.phase].length; ++i){	
					//if (userInput == this.rooms[this.game.player.currentroom].answers[i]){
						//this.phase = i + 1
						//correct = true
						//break
					//}
				//}
			//}
			else if(userInput == "g"){
				correct = true
				++this.phase
			}
			else{
				var roomBeingChecked = this.rooms[this.game.player.currentroom].keywords[this.phase]
				for (var i = 0; i < roomBeingChecked.length; ++i){
					if(userInput.includes(roomBeingChecked[i])){
						correct = true
					}
					else{
						correct = false
						break
					}
				}
				if (correct){
					++this.phase
				}
			}
			if (!correct){
				this.game.player.embarrassment++
				displayedText.appendChild(document.createTextNode("ごめんなさい。　どういうことですか。 "))
			}
		}
		if (this.phase == this.rooms[this.game.player.currentroom].answers.length){
			if (this.phase == 9){
				this.officeCompleted = true
			}
			else if (this.phase == 16){
				this.deanCompleted = true
			}
			else if (this.phase == 15){
				this.homeCompleted = true
				game.stateStack.push(new EpilogueScreen(game))
			}
		}
	}		
}

var vocabularyList = 'ちゅうきゅう = intermediate\n' +
	'しつれいいたします = More polite form of です, used with introducing oneself.\n' +
	'おせわになります = A very Japanese phrase that roughly translates to "you\'ll take care of me, thank you"\n' +
	'ひしょ = secretary\n' +
	'ぶちょう = dean\n' +
	'およびします = call\n' +
	'ので = because\n' +
	'おかけになって = to have a seat\n' +
	'おまち = wait\n' +
	'いただけますか = please\n' +
	'おまたせして = to make someone wait\n' +
	'ほんじつより = More academic than きょうから\n' +
	'こちらこそ = "It is I who should say so"\n' +
	'はじめて = first time\n' +
	'よね = tag question\n' +
	'ちがいますか = differ\n' +
	'かんげいかい = welcome party\n' +
	'しよう = let\'s\n' +
	'はなして = to talk\n' +
	'いたんですが = ongoing\n' +
	'が = but\n' +
	'つごう = availability\n' +
	'きゅうでわるいんだけど = sorry for short notice\n' +
	'ぜひ = added enthusiasm for a thank you\n' +
	'いっしょ = together\n' +
	'にがてな = polite way to say dislike\n' +
	'なさい = politeness affix\n' +
	'だった = informal "how was it"\n' +
	'かった = past informal ending\n' +
	'おなかすいた = are you hungry / literally "is your stomach empty"\n' +
	'して = imperative ending\n' +
	'ちゅうもん = order(noun)\n' +
	'いかが = how\n' +
	'かしこまりました = polite "I see"'


function Player(name, city, homestate){
	this.name = ""
	this.city = ""
	this.homestate = ""
	this.currentroom = 0
	this.embarrassment = 0
	this.updateInfo = function(yourName, yourCity, yourState){
		this.name = yourName
		this.city = yourCity
		this.homestate = yourState
	}
}

function Room(roomtitle, questions, answers, hints, keywords){		
	this.roomtitle = roomtitle
	this.questions = questions
	this.answers = answers
	this.hints = hints
	this.keywords = keywords
	//this.phase = 0
	
}

function printName(){
	alert(game.player.name)
}

function wasEnterPressed(e){
	var key = e.keyCode || e.which
	if(key == 13){
		game.play()
	}
}

// BUTTON FUNCTIONS
function skipClicked(){
	++game.stateStack[game.stateStack.length - 1].phase
	game.player.embarrassment += 2
	game.play()
}

function yourOfficeClicked(){
	var state = game.stateStack[game.stateStack.length - 1]
	state.phase = 0
	game.player.currentroom = 0
	game.play()
}

function deansOfficeClicked(){
	var state = game.stateStack[game.stateStack.length - 1]
	state.phase = 0
	game.player.currentroom = 1
	game.play()
}

function goHomeClicked(){
	var areYouSure = confirm("If you go home, you can't go anywhere else. Are you sure you want to go home?")
	if (areYouSure){
		var state = game.stateStack[game.stateStack.length - 1]
		state.phase = 0
		game.player.currentroom = 2
		game.play()
	}
}

function hintButtonClicked(){
	var state = game.stateStack[game.stateStack.length - 1]
	alert(state.rooms[game.player.currentroom].hints[state.phase])
}

function vocabButtonClicked(){
	alert(vocabularyList)
}

// START OF THE RUNNING PROGRAM

var game = new Game()
game.play()
console.log("Code running!")