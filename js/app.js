var app = new Vue({
	el: '#app',
	data: {
		gameStart: false,
		monsterHealth: 100,
		playerHealth: 100,
		turns: [],
		damage: 0
	},
	methods: {
		startGame: function() {
			this.gameStart = true;
			this.monsterHealth = 100;
			this.playerHealth = 100;
			this.turns = [];
		},
		playerAttack: function() {
			this.damage = this.getRandom(30, 10);

			this.playerHealth -= this.damage;
			this.generateMessage(false, 'Monster hits Player for', this.damage);
			
			if ( this.checkWinner() ) return; 
		},
		monsterAttack: function() {
			this.damage = this.getRandom(20, 5);

			this.monsterHealth -= this.damage;
			this.generateMessage(true, 'Player hits Monster for', this.damage);

			if ( this.checkWinner() ) return;
		},
		attack: function() {
			this.playerAttack();
			this.monsterAttack();
		},
		specialAttack: function() {
			this.playerAttack();

			this.damage = this.getRandom(50, 20);
			this.monsterHealth -= this.damage;
			this.generateMessage(true, 'Player hits hard Monster for', this.damage);

			this.checkWinner();
		},
		heal: function() {
			if ( this.playerHealth < 90 ) {
				this.playerHealth += 10;
				this.generateMessage(true, 'Player heals himself for', 10);
			}
			return;
		},
		giveUp: function() {
			this.gameStart = false;
		},
		getRandom: function(max, min) {
			return Math.max(Math.floor(Math.random() * max) + 1, min);
		},
		checkWinner: function() {
			if (this.playerHealth <= 0) {
				if ( confirm('You lost. One more time?') ) {
					this.startGame();
				} else {
					this.gameStart = false;
				}
				return true;
			} else if (this.monsterHealth <= 0) {
				if ( confirm('You won. One more time?') ) {
					this.startGame();
				} else {
					this.gameStart = false;
				}
				return true;
			}
			return false;
		},
		generateMessage: function(player, text, val) {
			return this.turns.unshift({
						isPlayer: player,
						value: text + ' ' + val
					});
		}
	}
});