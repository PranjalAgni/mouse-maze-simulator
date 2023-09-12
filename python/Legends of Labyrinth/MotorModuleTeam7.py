import RPi.GPIO as GPIO
import time

# Declare GPIO pins
MOTOR_RIGHT_ENABLE1 = 33
MOTOR_RIGHT_PIN1 = 29
MOTOR_RIGHT_PIN2 = 31
MOTOR_LEFT_ENABLE2 = 32
MOTOR_LEFT_PIN3 = 38
MOTOR_LEFT_PIN4 = 36

PWM_CONTROL_RIGHT = None
PWM_CONTROL_LEFT = None
SPEED_HIGH = 30
SPEED_LOW = 20
SLEEP_TIME_DELAY = 0.025

def setupMotorIO():
    GPIO.setmode(GPIO.BOARD)
    global PWM_CONTROL_LEFT
    global PWM_CONTROL_RIGHT
    global SPEED_HIGH
    global SPEED_HIGH_RIGHT
    global SPEED_HIGH_LEFT
    GPIO.setup(MOTOR_RIGHT_ENABLE1, GPIO.OUT)
    GPIO.setup(MOTOR_RIGHT_PIN1, GPIO.OUT)
    GPIO.setup(MOTOR_RIGHT_PIN2, GPIO.OUT)
    GPIO.setup(MOTOR_LEFT_ENABLE2, GPIO.OUT)
    GPIO.setup(MOTOR_LEFT_PIN3, GPIO.OUT)
    GPIO.setup(MOTOR_LEFT_PIN4, GPIO.OUT)
    PWM_CONTROL_RIGHT = GPIO.PWM(MOTOR_RIGHT_ENABLE1, 100)  # Initial Freq 100
    PWM_CONTROL_LEFT = GPIO.PWM(MOTOR_LEFT_ENABLE2, 100)  # Initial Freq 100
    PWM_CONTROL_LEFT.start(SPEED_HIGH_LEFT)
    PWM_CONTROL_RIGHT.start(SPEED_HIGH_RIGHT)


# Speed control for the motors
def setRightMotorSpeed(val):
    PWM_CONTROL_RIGHT.ChangeDutyCycle(val)


def setLeftMotorSpeed(val):
    PWM_CONTROL_LEFT.ChangeDutyCycle(val)

    
def speedDownRightMotor():
    global SPEED_LOW
    PWM_CONTROL_RIGHT.ChangeDutyCycle(SPEED_LOW)


def speedDownLeftMotor():
    global SPEED_LOW
    PWM_CONTROL_LEFT.ChangeDutyCycle(SPEED_LOW)


def speedUpRightMotor():
    global SPEED_RIGHT_HIGH
    PWM_CONTROL_RIGHT.ChangeDutyCycle(SPEED_HIGH_RIGHT)


def speedUpLeftMotor():
    global SPEED_LEFT_HIGH
    PWM_CONTROL_LEFT.ChangeDutyCycle(SPEED_HIGH_RIGHT)


# Movement controls
def moveRightMotorForward():
    GPIO.output(MOTOR_RIGHT_ENABLE1, 1)
    GPIO.output(MOTOR_RIGHT_PIN1, 1)
    GPIO.output(MOTOR_RIGHT_PIN2, 0)


def moveRightMotorBackward():
    GPIO.output(MOTOR_RIGHT_ENABLE1, 1)
    GPIO.output(MOTOR_RIGHT_PIN1, 0)
    GPIO.output(MOTOR_RIGHT_PIN2, 1)


def moveLeftMotorForward():
    GPIO.output(MOTOR_LEFT_ENABLE2, 1)
    GPIO.output(MOTOR_LEFT_PIN3, 1)
    GPIO.output(MOTOR_LEFT_PIN4, 0)


def moveLeftMotorBackward():
    GPIO.output(MOTOR_LEFT_ENABLE2, 1)
    GPIO.output(MOTOR_LEFT_PIN3, 0)
    GPIO.output(MOTOR_LEFT_PIN4, 1)


def stay_put():
    GPIO.output(MOTOR_LEFT_ENABLE2, 0)
    GPIO.output(MOTOR_LEFT_PIN3, 0)
    GPIO.output(MOTOR_LEFT_PIN4, 0)
    GPIO.output(MOTOR_RIGHT_ENABLE1, 0)
    GPIO.output(MOTOR_RIGHT_PIN1, 0)
    GPIO.output(MOTOR_RIGHT_PIN2, 0)
    time.sleep(SLEEP_TIME_DELAY)
