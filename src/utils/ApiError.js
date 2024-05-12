class ApiError extends Error{
  constructor(
    statusCode,
    message="something went wrong",
    error=[],
    statcs=""
  ){
    super(message)
    this.statusCode=statusCode
    this.data=null
    this.message=message
    success=false;
    this.error=error
    if(statcs){
      this.stack=statcs
    }else{
      Error.captureStackTrace(this,this.constructor)
    }
  }
}
export {ApiError}