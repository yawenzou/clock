
var clock = {
	hour : 0,
	minus : 0,
	second : 0,

	init: function() {
		this.canvas = document.getElementById("canvas");
		this.ctx = this.canvas.getContext("2d");

		var date = new Date();
		this.hour = date.getHours();
		this.minus = date.getMinutes();
		this.second = date.getSeconds();
		
		var that = this;
		setInterval(function() {
			that.second++;
			if (that.second >= 60) {
				that.minus++;
				that.second = 0;
			}

			if (that.minus >= 60) {
				that.hour++;
				that.minus = 0;
			}

			that.drawClock();
		}, 1000);
	},

	drawClock: function() {
		this.ctx.save();
		this.ctx.translate(250, 250);
		this.drawCircle(200, "#4c5066");
		this.drawCircle(175, "#fff");
		this.drawCircle(167, "#4c5066");
		this.drawCircle(162, "#fff");

		for (var i = 0; i < 12; i++) {
			this.drawScale();
		}

		this.pointer();
		this.drawCircle(5, "#fff");
		
		this.ctx.restore();
	},

	drawCircle: function(r, color) { //画圆 
		this.ctx.beginPath();
		this.ctx.arc(0, 0, r, 0, 2*Math.PI);
		this.ctx.fillStyle = color;
		this.ctx.fill();
	},

	drawScale: function() {    //画刻度

		this.ctx.rotate(30*Math.PI/180);
		this.ctx.fillStyle = "#4c5066";
		this.ctx.fillRect(152,-4,8,8);
	},

	pointer: function() {  //画指针

		//画时针
		if (this.hour > 12) {
			this.hour = this.hour -12;
		};
		var hAngle = this.hour*30 + this.minus/2;

		this.ctx.save();
		this.ctx.rotate(hAngle*Math.PI/180);
		this.ctx.beginPath();  
		this.ctx.moveTo(-7, 0);
		this.ctx.lineTo(-7, -98);
		this.ctx.arcTo(-7, -102, -2, -102, 5);
		this.ctx.lineTo(2, -102);
		this.ctx.arcTo(7, -102, 7, -98, 5);
		this.ctx.lineTo(7, 0);
		this.ctx.arcTo(7, 4, 2, 4, 5);
		this.ctx.lineTo(-2, 4);
		this.ctx.arcTo(-7, 4, -7, 0, 5);
		this.ctx.fillStyle = "#4c5066";
		this.ctx.fill();
		this.ctx.restore();

		//画分针
		var mAngle = this.minus*6 + this.second/10;

		this.ctx.save();
		this.ctx.rotate(mAngle*Math.PI/180);
		this.ctx.beginPath();  
		this.ctx.moveTo(-4, 0);
		this.ctx.lineTo(-4, -112);
		this.ctx.arcTo(-4, -116, 0, -116, 4);
		this.ctx.arcTo(4, -116, 4, -112, 4);
		this.ctx.lineTo(4, 0);
		this.ctx.arcTo(4, 4, 0, 4, 4);
		this.ctx.arcTo(-4, 4, -4, 0, 4);
		this.ctx.fillStyle = "#4c5066";
		this.ctx.fill();
		this.ctx.restore();


		//画秒针
		var sAngle = this.second*6;

		this.ctx.save();
		this.ctx.rotate(sAngle*Math.PI/180);
		this.ctx.beginPath();  
		this.ctx.moveTo(-2, 36);
		this.ctx.lineTo(-1, -144);
		this.ctx.lineTo(1, -144);
		this.ctx.lineTo(2, 36);
		this.ctx.closePath();
		this.ctx.fillStyle = "#ee4377";
		this.ctx.fill();
		this.ctx.restore();
	}
}

clock.init();