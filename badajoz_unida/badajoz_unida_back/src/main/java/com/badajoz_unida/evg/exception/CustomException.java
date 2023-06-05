package com.badajoz_unida.evg.exception;

public class CustomException extends Exception{
    private ErrorCode errorCode;

    public CustomException(ErrorCode errorCode) {

        this.errorCode = errorCode;
    }
    @Override
    public String getMessage() {
        return errorCode.getMensaje();
    }
    public ErrorCode getErrorCode() {
        return errorCode;
    }
}
