/* 

      0         0         0         0         0           0
      ^         ^         ^         ^         ^           ^
    isMoving   isDead    isJumping  isinAir  isColliding  isFrozen

*/

IS_MOVING_FLAG = 0b100000;
IS_DEAD_FLAG = 0b0100000;
IS_JUMPING_FLAG = 0b001000;
IS_COLLIDING_FLAG = 0b000100;
IS_FROZEN_FLAG = 0b000010;
