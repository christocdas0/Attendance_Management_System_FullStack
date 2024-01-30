// common function for show/hide container before ajax call. it will act like loader
function showOrHide(loader, container, flag){
    container = document.getElementById(container);
	loader = document.getElementById(loader);
	if(flag){
		container.style.display = 'none';
		loader.style.display = 'flex';
	}else{
		container.style.display = 'flex';
		loader.style.display = 'none';
	}
}