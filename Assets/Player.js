#pragma strict

/*
var floatingPointNumber : float;
var someWords : String = "This is a string";
var aRoundNumber : int = 100;
var position : Vector3 = new Vector3( 0.4, 1.4, 0.0 );
var positionFlat : Vector2 = new Vector2( -100, 40.25 );
*/
var currentSpeed : float = 10;
var walkSpeed : float = 10;
var runSpeed : float = 20;

var growSpeed : float = 2;
var chargeColor : Color = Color.white;
var charge : float = 0;
var chargeSpeed : float = 2;

var isHiding : boolean = false;

private var scale : float = 1;
private var speed : Vector3 = new Vector3( 0, 0, 0 );
private var originalColor : Color;

var hidingColor : Color = Color.black;
var maxHideSpeed : float = 0.5;

function Start () {
	originalColor = renderer.material.color;
}

function Update () {

	var controller : CharacterController = GetComponent ("CharacterController");

	speed = controller.velocity;

	// Change speed with respect to gravity.
	speed += Physics.gravity * Time.deltaTime;

	// Hold shift to run.
	if ( Input.GetKey( "left shift" )) {
		currentSpeed = runSpeed;
	}
	else {
		currentSpeed = walkSpeed;
	}



	// Move left or right if arrows are pressed.
	speed.x = Input.GetAxis( "Horizontal") * currentSpeed;


	/*
	if ( Input.GetKey( "right" )) {
		speed.x = currentSpeed;
	} else if ( Input.GetKey( "left" )) {
		speed.x = -currentSpeed;
	} else {
		speed.x = 0;
	}*/

	if ( controller.isGrounded ){
		// Just pressed.
		if ( Input.GetKeyDown( "up" )){
			renderer.material.color = chargeColor;
		}

		// Held down.
		if ( Input.GetKey( "up" )){
			charge += chargeSpeed * Time.deltaTime;
		}

		// Released.
		if ( Input.GetKeyUp( "up" )){
			renderer.material.color = originalColor;
			speed.y = charge;
			charge = 0;
		}
	}

	if( isHiding == false &&
	    currentHideyHole != null &&
		controller.velocity.y < maxHideSpeed ) {

		if (Input.GetKey( "h" )){
			Hide();
		}
	}

	if ( isHiding &&
	     Input.GetKeyUp( "h" ) ||
	     currentHideyHole == null ) {
		Unhide();
	}

	// Jump if up is pressed.
	/*
	if ( controller.isGrounded && Input.GetKeyDown( "up" )) {
		speed.y = jumpSpeed;
	}*/

	// Update character controller position.
	if ( isHiding == true ){
		speed = new Vector3( 0, 0, 0 );
	}

	controller.Move( speed * Time.deltaTime );

	if (Input.GetKey ( "space" )){
		scale += growSpeed * Time.deltaTime;
		transform.localScale = new Vector3( scale, scale, scale );
	}
/*
	speed.y += 10;
	myNewV3.y += 10;
	Debug.Log( "myNewV3 = " + myNewV3 + ", speed = " + speed );
	*/
}

var currentHideyHole : GameObject;

function OnTriggerEnter( other : Collider )
{
	currentHideyHole = other.gameObject;
}


function OnTriggerExit( other : Collider )
{
	currentHideyHole = null;
}

function Hide()
{
	isHiding = true;
	renderer.material.color = hidingColor;
}

function Unhide()
{
	isHiding = false;
	renderer.material.color = originalColor;
}