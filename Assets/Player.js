#pragma strict

/*
var floatingPointNumber : float;
var someWords : String = "This is a string";
var aRoundNumber : int = 100;
var position : Vector3 = new Vector3( 0.4, 1.4, 0.0 );
var positionFlat : Vector2 = new Vector2( -100, 40.25 );
*/
var moveSpeed : float = 10;
var growSpeed : float = 2;
var chargeColor : Color = Color.white;
var charge : float = 0;
var chargeSpeed : float = 2;

private var scale : float = 1;
private var speed : Vector3 = new Vector3( 0, 0, 0 );
private var originalColor : Color;


function Start () {
	originalColor = renderer.material.color;
}

function Update () {

	var controller : CharacterController = GetComponent ("CharacterController");
	
	speed = controller.velocity;
	
	// Change speed with respect to gravity.
	speed += Physics.gravity * Time.deltaTime;

	// Move left or right if arrows are pressed.
	if ( Input.GetKey( "right" )) {
		speed.x = moveSpeed;
	} else if ( Input.GetKey( "left" )) {
		speed.x = -moveSpeed;
	} else {
		speed.x = 0;
	}
	
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
	
	
	// Jump if up is pressed.
	/*
	if ( controller.isGrounded && Input.GetKeyDown( "up" )) {
		speed.y = jumpSpeed;
	}*/
	
	// Update character controller position.
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
	