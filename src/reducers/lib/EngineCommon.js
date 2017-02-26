class EngineCommon  {

	constructor() {

	}

  getNextInTurn(inTurn) {
  	var next = (inTurn+1)%5
    return next
  }

  getArea() {
    return 'match';
  }

}

export default EngineCommon
