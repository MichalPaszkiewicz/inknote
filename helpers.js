function allItemsAre(items, xAndY)
{
	for(var i = 0; i < items.length; i++)
	{
		if(!xAndY(items[i])){
			return false;
		}
	}
	return true;
}
