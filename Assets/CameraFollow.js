#pragma strict

var target : Transform;
var zoomSpeed : float = 2;
var distance : float = 10;
var minDistance : float = 3;
var maxDistance : float = 20;

function LateUpdate () {
	
	if ( Input.GetKey( "z")){
		Debug.Log( "distance " + zoomSpeed * Time.deltaTime );
		distance += zoomSpeed * Time.deltaTime;
	}
	
	if ( Input.GetKey( "x" )){
		distance -= zoomSpeed * Time.deltaTime;
	}
	
	if ( distance < minDistance ) {
		distance = minDistance;
	} else if ( distance > maxDistance ) {
		distance = maxDistance;
	}
		
	transform.position.x = target.position.x;
	transform.position.y = target.position.y;
	transform.position.z = target.position.z - distance;
}