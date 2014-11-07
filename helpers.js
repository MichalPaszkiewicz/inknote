Array.prototype.allItemsAre = function(xAndY){
   	for(var i = 0; i < this.length; i++)
	{
		if(!xAndY(this[i])){
			return false;
		}
	}
	return true;
}

Array.prototype.countWhere = function(xAndY){
	var count = 0;
	for(var i = 0; i < this.length; i++)
	{
		if(xAndY(this[i])){
			count++;
		}
	}
	return count;
}
