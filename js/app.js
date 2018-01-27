var app = new Vue({
	el: '#app',
	data: {
		startGame: false,
		finished: false,
		widthMonsterInit: 100,
		widthYouInit: 100,
		lastHits: [],
		lastHeal: [],
		lastSpecialHit: [],
		hitsMonster: 'Monster hits player for',
		hitsPlayer: 'Player hits monster for',
		healMessage: 'Player heals himself for',
		healCounter: 0,
		specialHitCounter: 0
	},
	computed: {

	},
	methods: {
		startNewGame: function() {
			this.startGame = true;
			this.widthYouInit = 100;
			this.widthMonsterInit = 100;
			this.healCounter = 0;
			this.specialHitCounter = 0;
		},
		attack: function() {
			var random = {
				randomValueYou: Math.floor((Math.random() * 40) + 1),
				randomValueMonster: Math.floor((Math.random() * 40) + 1)
			};

			this.widthYouInit -= random.randomValueYou;
			this.widthMonsterInit -= random.randomValueMonster;
			this.lastHits.unshift(random.randomValueMonster);
			this.lastHits.unshift(random.randomValueYou);
			// this.lastActionMonster.unshift(random.randomValueYou);
			// this.lastActionYou.unshift(random.randomValueMonster);
		},
		specialAttack: function() {
			var random = {
				randomSpecialHitValue: Math.floor((Math.random() * 50) + 10)
			};
			if (this.specialHitCounter < 1) {
				this.widthMonsterInit -= random.randomSpecialHitValue;
				this.lastSpecialHit.unshift(random.randomSpecialHitValue);
				this.specialHitCounter++;
			}
		},
		heal: function() {
			var random = {
				randomHealValue: Math.floor((Math.random() * 10) + 5)
			};
			if (this.widthYouInit < 100 && this.healCounter < 3) {
				this.widthYouInit += random.randomHealValue;
				this.lastHeal.push(random.randomHealValue);
				this.healCounter++;
			}	
		}
	},
	watch: {
		widthMonsterInit: function(val) {
			var that = this;
			if (val < 0) {
				this.widthMonsterInit = 0;
				setTimeout(function(){
					alert('You won! Congratulations!');
					that.startGame = !that.startGame;
				}, 500);
			}
		},
		widthYouInit: function(val) {
			var that = this;
			if (val < 0) {
				this.widthYouInit = 0; 
				setTimeout(function(){
					alert('You lost, maybe, you should try one more time!');
					that.startGame = !that.startGame;
				}, 500);
			}
		}
	}
});