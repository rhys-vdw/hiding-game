#pragma strict

var hands : Transform[];
var currentState : State = State.Searching;
var searchSpeed : float = 2;
var searchingLeft : boolean;
var xMin : float = -30;
var xMax : float = 30;
var player : Player = null;
var detectionDistance : float = 5;

enum State {
	Searching,
	Approaching,
	Attacking
}

function Start () {
}

function Update ()
{
	if( currentState == State.Searching )
	{
		UpdateSearch();
	}
	else if( currentState == State.Approaching )
	{
		UpdateApproaching();
	}
	else if( currentState == State.Attacking )
	{
		// UpdateAttacking();
	}
}

function UpdateSearch()
{

	if ( searchingLeft ) {
	
		if ( transform.position.x > xMin ){
			transform.position.x -= searchSpeed * Time.deltaTime;
		}
		else {
			searchingLeft = false;
		}
		
	} else {
	
		if ( transform.position.x < xMax ){
			transform.position.x += searchSpeed * Time.deltaTime;
		}
		else {
			searchingLeft = true;
		}
	}
	
	var distance = player.transform.position.x - transform.position.x;
	
	if( distance < 0 ) {
		distance *= -1;
	}
	
	if ( distance < detectionDistance ){
		currentState = State.Approaching;
	}
}

function UpdateApproaching()
{
	var renderers = gameObject.GetComponentsInChildren( Renderer );
	for( var r in renderers ) {
		(r as Renderer).material.color = Color.red;
	}
}