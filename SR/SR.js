var TARGET_SIZE = 16;
var startTime, intervalID;
var rescue, target, direction, radarRange, context;

function start()
{
	var canvas = document.getElementById("searchArea");
	canvas.height = window.prompt("Search area height:", canvas.height);

	rescue = {x: canvas.width / 2, y: canvas.width / 2};
	target = {x : canvas.width * Math.random(), y : canvas.height * Math.random()};

	direction = {dx: 1, dy: 1};
	radarRange = document.getElementById("radar").value;

	context = canvas.getContext('2d');
	startTime = (new Date()).getTime();
	intervalID = setInterval(simulate, 5);
}

function simulate()
{
	clear();
	drawTarget();
	drawRescue();
	updateProgress();
	if (found())
	{
		clearInterval(intervalID);
	}
	else
	{
		if (xBoundary()) direction.dx = -direction.dx;
		if (yBoundary()) direction.dy = -direction.dy;

		if (topBoundary()) direction.dy = -direction.dy;
		if (leftBoundary()) direction.dx = -direction.dx;

		rescue.x += direction.dx;
		rescue.y += direction.dy;
	}
}

function clear()
{
	context.clearRect(0, 0, context.canvas.width, context.canvas.height);
}

function drawTarget()
{
	context.beginPath();
	context.lineWidth = "4";
	context.strokeStyle = "red";
	context.rect(target.x, target.y, TARGET_SIZE, TARGET_SIZE);
	context.stroke();
}

function drawRescue()
{
	context.beginPath();
	context.fillStyle = "#0000ff";
	context.arc(rescue.x, rescue.y, radarRange, 0, Math.PI * 2, true);
	context.closePath();
	context.fill();
}

function xBoundary()
{
	return rescue.x >= context.canvas.width - radarRange;
}

function yBoundary()
{
	return rescue.y >= context.canvas.height - radarRange;
}

function leftBoundary()
{
	return rescue.x <= radarRange;
}

function topBoundary()
{
	return rescue.y <= radarRange;
}

function updateProgress()
{
	var elapsed = document.getElementById("elapsed");
	elapsed.innerHTML = Math.floor(((new Date()).getTime() - startTime) / 1000);

	var distanceToTarget = document.getElementById("targetDistance");
	distanceToTarget.innerHTML = Math.floor(toTarget());
}

function toTarget()
{
	return Math.sqrt(Math.pow(Math.abs(target.x - rescue.x), 2) + Math.pow(Math.abs(target.y - rescue.y), 2));
}

function found()
{
	if(toTarget() > radarRange) {
		return false;
	}
	else {
		return true;
	}
}
