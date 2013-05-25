#pragma strict

var speed : float = 1;
var currentTarget : Vector3;
var idleLocalPosition : Vector3;

enum HandState {
    Idle,
    Punching,
    Retracting
};

var currentState : HandState = HandState.Idle;

function Start()
{
    idleLocalPosition = transform.localPosition;
}

function Punch( target : Vector3 )
{
   if ( currentState == HandState.Idle ){
        currentTarget = target;
        currentState = HandState.Punching;
    }
}

function Update()
{
    if( currentState == HandState.Idle ) {
        return;
    }
    if( currentState == HandState.Punching ) {
        UpdatePunching();
    }
    else if( currentState == HandState.Retracting ) {
        UpdateRetracting();
    }
}

function OnTriggerEnter( collider : Collider )
{
    print( name + " has hit " + collider.name );

    if( currentState == HandState.Punching && collider.gameObject.tag != "Player") {
        currentState = HandState.Retracting;
    }
}

function UpdatePunching()
{
    var step = speed * Time.deltaTime;

    transform.position = Vector3.MoveTowards(
        transform.position,
        currentTarget,
        step
    );

    if (transform.position == currentTarget){
        currentState = HandState.Retracting;
    }
}

function UpdateRetracting()
{
    var step = speed * Time.deltaTime;

    transform.localPosition = Vector3.MoveTowards(
        transform.localPosition,
        idleLocalPosition,
        step
    );

    if( transform.localPosition == idleLocalPosition){
        currentState = HandState.Idle;
    }
}