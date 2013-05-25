#pragma strict

var hands : Transform[];
var currentState : EnemyState = EnemyState.Searching;
var searchSpeed : float = 2;
var chaseSpeed : float = 4;
var searchingLeft : boolean;
var xMin : float = -30;
var xMax : float = 30;
var player : Player = null;
var detectionDistance : float = 7;
var attackDistance : float = 1;
var leftHand : Hand = null;
var rightHand : Hand = null;
var punchPeriod : float = 1;

private var nextHandToPunch : Hand = null;
private var timeUntilPunch : float;

enum EnemyState {
	Searching,
	Approaching,
	Attacking
}

function Start()
{
	nextHandToPunch = leftHand;
}

function Update ()
{
	// Set EnemyState
	if( currentState == EnemyState.Searching )
	{
		UpdateSearch();
	}
	else if( currentState == EnemyState.Approaching )
	{
		UpdateApproaching();
	}
	else if( currentState == EnemyState.Attacking )
	{
		UpdateAttacking();
	}
}

function UpdateSearch()
{
	// Look left, until xMin is reached
	if ( searchingLeft ) {

		if ( transform.position.x > xMin ){
			transform.position.x -= searchSpeed * Time.deltaTime;
		}
		else {
			searchingLeft = false;
		}

	}
	// Look right, until xMax is reached
	else {

		if ( transform.position.x < xMax ){
			transform.position.x += searchSpeed * Time.deltaTime;
		}
		else {
			searchingLeft = true;
		}
	}

	// Change to EnemyState Approaching
	if ( player.isHiding == false && DistanceToPlayer() < detectionDistance ){
		currentState = EnemyState.Approaching;
	}
}

function DistanceToPlayer() : float
{
	return Mathf.Abs( player.transform.position.x - transform.position.x );
}

function SetColor( color : Color ) : void
{
	var renderers = gameObject.GetComponentsInChildren( Renderer );
	for( var r in renderers ) {
		(r as Renderer).material.color = color;
	}
}

function UpdateApproaching()
{
	SetColor( Color.red );

	// Move toward Player
	if ( transform.position.x > player.transform.position.x){
		transform.position.x -= chaseSpeed * Time.deltaTime;
	}
	else {
		transform.position.x += chaseSpeed * Time.deltaTime;
	}

	if ( DistanceToPlayer() < attackDistance ){
		currentState = EnemyState.Attacking;
	}
}

function SwapPunchingHand()
{
	if( nextHandToPunch == leftHand ) {
		nextHandToPunch = rightHand;
	}
	else {
		nextHandToPunch = leftHand;
	}
}

function UpdateAttacking()
{
	SetColor( Color.blue );

	// Reduce time until punch
	timeUntilPunch -= Time.deltaTime;

	// If time is zero, punch now and reset time until next punch
	if( timeUntilPunch <= 0 ){
		nextHandToPunch.Punch( player.transform.position );
		SwapPunchingHand();
		timeUntilPunch = punchPeriod;
	}

}