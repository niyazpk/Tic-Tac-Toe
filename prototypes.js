/*
Array.prototype.compareTo = function(testArr) {
    if (this.length != testArr.length) return false;
    for (var i = 0; i < testArr.length; i++) {
        if (this[i].compareTo) { 
            if (!this[i].compareTo(testArr[i])) return false;
        }
        if (this[i] !== testArr[i]) return false;
    }
    return true;
}*/

function forEach(array, action){
	for(var i = 0; i < array.length; i++ ){
		action(array[i]);
	}
}