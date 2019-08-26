function consola(msg){console.log(msg);}
function isset(e)
{
	if(typeof e === "undefined")
		return false;
	switch(e)
	{
		case "":
		//case 0:
		// case "0":
		case null:
		case false:
		return false;
		default:
		return true;
	}
}
//ARRAY
function isEmpty(array)
{
	if(is_array(array) || isString(array))
		if(array.length == 0)
			return true;
	return false;
}
function isNull (value) {return value === null;}
function isUndefined (value) {return typeof value === 'undefined';}

function isString(value) {return typeof value === 'string' || value instanceof String;}

function is_array(array)
{
	if(Array.isArray(array))
		return true;
	else
		return false;
}
function array_push(array, value)
{
	array.push(value);
}
function array_fromObject(objeto)
{
	return Array.from(objeto);
}
function array_removeElement(array, element)
{
	var index = array.indexOf(element);//borro de array activos
	if (index !== -1) array.splice(index, 1);
}
///////ARRAY END
function isObject(obj){return (typeof obj === 'object') ?  true : false}

function afterDelay(timeMilisecs, callBack)
{
	setTimeout(function(){ callBack();}, timeMilisecs);
}
function timedBucle(time, callBack)
{
	setInterval(function(){ callBack(); }, time);
}
function printDiv(divName)
{
	var printContents = document.getElementById(divName).innerHTML;
	var originalContents = document.body.innerHTML;
	document.body.innerHTML = printContents;
	window.print();
	document.body.innerHTML = originalContents;
}
function toDataURL(url, callback)
{
	var xhr = new XMLHttpRequest();
	xhr.onload = function() 
	{
	  var reader = new FileReader();
	  reader.onloadend = function()
	  {
		callback(reader.result);
	  }
	  reader.readAsDataURL(xhr.response);
	};
	xhr.open('GET', url);
	xhr.responseType = 'blob';
	xhr.send();
}
function getImgFromUrl(logo_url, callback) {
    var img = new Image();
    img.src = logo_url;
    img.onload = function () {
        callback(img);
    };
}
function generatePDF(img){
    var options = {orientation: 'p', unit: 'mm', format: custom};
    var doc = new jsPDF(options);
	doc.addImage(img, 'JPEG', 0, 0, 100, 50);}

function setIDsToElements(htmlCollection)
{
	var elementArray = HTMLCollectionToArray(htmlCollection);
	elementArray.forEach(function(element, index)
	{
		var tag = element.nodeName;
		if(!isset(element.id))
			element.setAttribute("id",tag+index);
	});
}
function HTMLCollectionToArray(array){return Array.from(array);}

function clonarYremover(selector, callBack, addBack, returnCloned)
{
	var originalElement = document.getElementById(selector); //Selecciono el elemento
	var clonedElement = originalElement.cloneNode(true); //Clono el Elemento
	var parentNode = originalElement.parentNode;
	parentNode.removeChild(originalElement); //Remuevo el Elemento Tabla original
	if(isset(callBack))
		callBack();
	if(addBack)
		parentNode.appendChild(clonedElement);
	if(returnCloned)
		return clonedElement;
}
function pdfINIT(selector)
{
	var pdf = new jsPDF('p', 'pt', 'a4');
	pdf.setFontSize(16);
	
	source = $(selector)[0];
	consola(source);
	specialElementHandlers = {'#bypassme': function (element, renderer){return true;}};
	margins = {top: 5, bottom: 5, left: 10, width: 522};
	return pdf;
}
function pdfGenerateFromTableHTML(doc, tableID){pdfGenerarTabla(doc, tableID, 120, [227, 40, 0]);}
function pdfGenerarTabla(doc, tableID, startY, rgbArray)
{
	doc.autoTable(
	{
		headStyles: {fillColor: rgbArray},
		html: tableID,
		startY: startY
	});
}
function demoFromHTML(nombre, selector){pdfHTMLimgTable(nombre, selector);}
function pdfHTML(selector, nombre, tableID)//SIN imagenes
{
	tableIDjq = "#"+tableID;
	var pdf = pdfINIT(selector);//inicializa source, specials y margins
	clonarYremover(tableID, function()
	{
		pdf.fromHTML(source, margins.left, margins.top, {'width': margins.width, 'elementHandlers': specialElementHandlers});
	}, true, false);
	pdfGenerateFromTableHTML(pdf, tableIDjq);
	pdf.save(nombre+".pdf");
}
function pdfHTMLimgTable(nombre, selector)//Con imagenes
{
	var pdf = pdfINIT(selector);//inicializa source, specials y margins
	var headerHTML = source.querySelector("h5");
	var justificacionHTML = source.querySelector("h4");
	var ArrayTables = source.getElementsByTagName("table");
	var imgHTMLCollection = source.getElementsByTagName("img");
	setIDsToElements(ArrayTables);
	var tableID = ArrayTables[0].id;
	var tableIDJQ = "#"+tableID;
	setIDsToElements(imgHTMLCollection);
	var ArrayIMGs = HTMLCollectionToArray(imgHTMLCollection);
	ArrayIMGs.forEach(function(element, index)
	{
		getImgFromUrl(element.src, function (img) 
		{
			pdf.addImage(img, 'JPEG', 15, 400, 0, 0);
		});
	});
	pdfGenerarTabla(pdf, tableIDJQ, 120, [227, 40, 0]);
	pdf.fromHTML(headerHTML, margins.left, margins.top, {'width': margins.width,'elementHandlers': specialElementHandlers});
	pdf.fromHTML(justificacionHTML, margins.left, 250, {'width': margins.width,'elementHandlers': specialElementHandlers});
	afterDelay(900, function(){pdf.save(nombre+'.pdf');});
}

function deepClone(varObjeto)
{
	return JSON.parse(JSON.stringify(varObjeto));
}
function noCache()
{
	$('img').each(function()
	{
		$(this).attr('src',$(this).attr('src')+ '?' + (new Date()).getTime());
	});
}
function uploadImg(url,selector)
{
	$.ajax(
	{
		url: url, // Url to which the request is send
		type: "POST",             // Type of request to be send, called as method
		data: new FormData(selector), // Data sent to server, a set of key/value pairs (i.e. form fields and values)
		contentType: false,       // The content type used when sending data to the server.
		cache: false,             // To unable request pages to be cached
		processData: false,        // To send DOMDocument or non processed data file it is set to false
		success: function(data)   // A function to be called if request succeeds
		{
			console.log(data);
			//verImagen(id);
		}
	});	
}
function readURL(input,idIMG) 
{
	if(input.files && input.files[0])
	{
		var reader = new FileReader();
		reader.onload = function(e)
		{
			$(idIMG).attr('src', e.target.result);
		}
		reader.readAsDataURL(input.files[0]);
	}
}
function dataURLtoBlob(dataurl)
{
	var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
		bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
	while(n--){
		u8arr[n] = bstr.charCodeAt(n);
	}
	return new Blob([u8arr], {type:mime});
}
function enviarIndex(valor,index)
{
	vectorImagenX[index] = valor;
	alert(valor);
}
function newTab(url){window.open(url);}
//DATA TABLES FUNCIONTS
//////////////////////////////////////
dtCFGbuttons = {responsive: false, info: false, lengthChange: true, scrollX: true, order: [[ 0, 'desc' ]],language: {'url': '//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json'},dom: 'Bfrtip',buttons: [{extend:'excel',text:'EXCEL',filename:'PRUEBA'},{extend:'pdf',text:'PDF',filename:'PDFtest'}]};
dtCFG = {responsive: false, info: false, lengthChange: true, scrollX: true, order: [[ 0, 'desc' ]],language: {'url': '//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json'}};
dtCFGRH = {responsive: false, info: false,scrollX: true,order: [[ 0, 'desc' ]],pageLength: 50,language: {'url': '//cdn.datatables.net/plug-ins/1.10.16/i18n/Spanish.json'},dom: 'Bfrtip',buttons:[{extend:'excel',text:'EXCEL',filename:'PRUEBA'},{extend:'pdf',text:'PDF',filename:'PDFtest'}]};
dtCFGSlim = {responsive: false, info: false,scrollX: true,pageLength: 10,searching: false, paging: false,lengthChange:false};
//////////////////////////////////////
///DT DELETE//////////// 
function dtRemoveRow(dtObject, rowId){dtObject.row(rowId).remove().draw();}
///DT INSERT//////////////////////////
function dtInsertRow(dtObject, arrayData)//inserting new row based on dtObject and array of data
{rowNode = dtInsertRowNode(dtObject, arrayData);}

function dtInsertRowNode(dtObject, arrayData)//inserting new row based on dtObject and array of data
{
	rowNode = dtObject.row.add(arrayData).draw().node();
	return rowNode;
}
function dtInsertRowWithAttributes(dtObject, arrayData, objectAttrs)//insert new row with many attributes on objectAttrs
{
	rowNode = dtInsertRowNode(dtObject, arrayData);
	setAttributes(rowNode, objectAttrs);
}
function dtInsertRowAndAttrib(dtObject, arrayData, attr, attrVal)//inserting new row based on dtObject and array of data
{
	rowNode = dtInsertRowNode(dtObject, arrayData);
	rowNode.setAttribute(attr, attrVal);
	return rowNode;
}
///////////////////////////////////////////
///DT UPDATE//////////////////////////////////////
function dtUpdateRow(dtObject, row, array)//updating row based on dtObject, row and array of every data 
{
	dtObject.row(row).data(array).draw(false);
}
function dtUpdateRowRNode(dtObject, row, array)//updating row based on dtObject, row and array of every data 
{
	return dtObject.row(row).data(array).draw(false).node();
}
function dtUpdateRowWithAttrs(dtObject, row, array, objAttrs)
{
	rowNode = dtUpdateRowRNode(dtObject, row, array);
	setAttributes(rowNode, objAttrs);
}
function dtUpdateRows(dtObject, array)//updating row based on dtObject, row and array of every data 
{
	dtObject.rows().data(array).draw();
}
function dtUpdateCol(dtObject, col, dato)//updating the whole col from table based on , dtObject, col Index and data to be inserted
{
	dtObject.rows().every( function ( rowIdx, tableLoop, rowLoop ) 
	{var data = dtObject.row(rowIdx).data();data[col]=dato;dtObject.row(rowIdx).data(data);});
}
function dtUpdateEveryRow(dtObject, vector)//updating the whole col from table based on , dtObject, col Index and data to be inserted
{
	dtObject.rows().every( function ( rowIdx, tableLoop, rowLoop ) 
	{
		var data = dtObject.row(rowIdx).data();
		vector.forEach(function(value, i)
		{
			if(isset(value))
				data[i] = value;
		});
		dtObject.row(rowIdx).data(data);
	});
} 
function dtEditCell(dtObject, cellObject, row, col, dato) //editing a single cell 
{
    if(cellObject == null)
        dtObject.cell( row, col ).data(dato).draw(false);
    else
        dtObject.cell(cellObject).data(dato).draw(false);
    //document.getElementById('table1').rows[rowIndex].cells[cellIndex];
}
function dtUpdateColIfRowHasClass(dtObject, classToMatch, col, dato)//updating column from Row if the row matches with class
{
	dtRecorrerRows(dtObject, function(rowIdx, tableLoop, rowLoop)
	{
		if(elementHasClass( dtRtnNode(dtObject, rowIdx), classToMatch))
		{
			var data = dtObject.row(rowIdx).data();
			data[col] = dato;
			dtObject.row(rowIdx).data(data);
		}
	});
}
function dtRtnNode(dtObject, rowIdx)
{
	return dtObject.row(rowIdx).nodes()[0];
}
function dtSetClassToRow(dtObject, row, clase)//updating row class of specific row
{setClassToElement( row, clase);}
function dtSetClassRowIFmatchClass(dtObject, classSearched, classToSet)//updating row class
{
	dtRecorrerRows(dtObject, function(rowIdx, tableLoop, rowLoop)
	{
		var rowNode = dtRtnNode(dtObject, rowIdx);
		if(elementHasClass( rowNode, classSearched))
			rowNode.setAttribute("class",classToSet);
	});
}
function dtSetClassToEveryRow(dtObject, classToSet)//updating every row class
{
	dtRecorrerRows(dtObject, function(rowIdx, tableLoop, rowLoop)
	{
		dtSetClassToRow(dtObject, dtRtnNode(dtObject, rowIdx), classToSet);
	});
}
function dtRecorrerRows(dtObject, callBack)
{
	dtObject.rows().every( function ( rowIdx, tableLoop, rowLoop )
	{
		if(isset(callBack))
			callBack(rowIdx, tableLoop, rowLoop);
	});
}
function setClassToElement(element, clase){setAttribute(element, "class", clase);}
function addClass(object, clase){object.classList.add(clase);}
function removeClass(object, clase){object.classList.remove(clase);}
function setAttribute(object, attr, attrVal){object.setAttribute(attr, attrVal);}
function setAttributes(element, object)
{
	var keys = Object.keys(object);
	keys.forEach(function(i)
	{
		element.setAttribute(i, object[i]);
	});
}
//DATA TABLE FUNCTION
function dtclickTr(dtObject, THIS, evt)//return object with usefull shit of DT Row clicked
{
	var objTr = {};
	//objTr.arrayCol = [];
    objTr.target = evt.target;
    objTr.thisTr = THIS;
	objTr.array = dtObject.row( objTr.thisTr ).data();
	objTr.firstC = objTr.array[0];
    objTr.idC = objTr.array[0];
    //objTr.id = objTr.thisCell.parentElement.id;
	objTr.id = objTr.thisTr.id;
	objTr.thisCell = evt.target.closest('td');
    objTr.thisCell.col = objTr.thisCell._DT_CellIndex.column;
	objTr.thisCell.row = objTr.thisCell._DT_CellIndex.row;
	objTr.thisCell.textoInterno = objTr.thisCell.innerText;
	//Attributes from tr (row)
	objTr.TrAttributes = [];
	Array.prototype.slice.call(objTr.thisTr.attributes).forEach(function(item) {objTr.TrAttributes[item.name] = item.value;});
    return objTr;
}

function setHTMLToClass(clase, text, add)
{
	var x = document.getElementsByClassName(clase);
	if(add)
	{
		var html = x[0].innerHTML;
		x[0].innerHTML = html+text;
	}
	else
		x[0].innerHTML = text;
}
function addListToNTLclass(clase, href, strong, muted, body)
{
	var html = "<li>\
				<a href='"+href+"'>\
					<div>\
						<strong>"+strong+"</strong>\
						<span class='pull-right text-muted'>\
							<em>"+muted+"</em>\
						</span>\
					</div>\
					<div>"+body+"</div>\
				</a>\
			</li>\
            <li class='divider'></li>";
			setHTMLToClass(clase, html, true);
}
function navBarUpdater(clase, href, strong, muted, body)
{
	addListToNTLclass(clase, href, strong, muted, body);
	var classCounter = clase+"Counter";
	var counter = document.getElementsByClassName(classCounter);
	counter = isNaN(parseInt(counter[0].innerHTML)) ? 0 : parseInt(counter[0].innerHTML);
	counter=counter+1;
	setHTMLToClass(classCounter, counter, false);
}
function rowIdToRowNode(rowID)
{
	if(!isNaN(rowID))
	{
		var rowID = "#"+rowID;
		var row = objTabla.row(rowID).node();
	}
	else
		var row = rowID;
	return row;
}
function removeElementsWithClass(Clase)
{
	var paras = document.getElementsByClassName(Clase);
	while(paras[0])
		removeElement(paras[0]);
}
///GETS ELEMENTS
function dge_ID(id){return document.getElementById(id);}
function getByID(id){return dge_ID(id);}
function getByTAG(tag){return document.getElementsByTagName(tag);}
function getByCLASS(clase){return document.getElementsByClassName(clase);}
//
function append(elementId, element){document.getElementById(elementId).appendChild(element);}
function appendE(parent, child){parent.appendChild(child);}
function removeElementByID(elementId){var element = document.getElementById(elementId);removeElement(element);}
function removeElement(element) {element.parentNode.removeChild(element);}
function setElementToID(element, id)
{
	var internalElements = document.getElementById(id).childNodes;
	internalElements.forEach(function(e){removeElement(e);});
	append(id, element);
}
function setValue(elementId, val){document.getElementById(elementId).value(val);}
function setHTML(elementId, val){document.getElementById(elementId).innerHTML = val;}
function setText(elementId, val){document.getElementById(elementId).innerText = val;}
function textToInt(string)
{
	var num = string.replace(".","");
	var number = parseInt(num.replace(",",""));
	return number;
}
function textFilter(idInput, url, idDiv, textFilterCallBack)
{//analiza cambios de un inputText manda a una URL por ajax y la respuesta 
	//carga a un div, con posibilidad de un callback.
	$("#"+idInput).off().on("change keyup", function()
	{
		var texto = this.value;
		if(texto.length >= 3)
		{
			onAjax(url, {texto:texto}, function(response)
			{
				document.getElementById(idDiv).innerHTML = response;
				if(textFilterCallBack)
					textFilterCallBack();
			});
		}
	});
}
function tableOperations(tableId, DTCFG, afterCreatedCallBack, afterClickedCallBack)
{
	var tableIdJQ = "#"+tableId;
	window[tableId] = $(tableIdJQ).DataTable(DTCFG);
	if(afterCreatedCallBack)
	afterCreatedCallBack();

	$(tableIdJQ).off("click").on("click","tr", function(e)
	{
		obj = dtclickTr(window[tableId], this, e);
		delete e;
		if(afterClickedCallBack)
			afterClickedCallBack();
	});
}
function tableOperationsGlobalVar(GlobalVar, tableId, DTCFG, onCreatedCallBack, onClickCallBack)
{
	var tableIdJQ = "#"+tableId;
	window[tableId] = $(tableIdJQ).DataTable(DTCFG);
	if(onCreatedCallBack)
		onCreatedCallBack();
	
	$(tableIdJQ).off("click").on("click","tr", function(evt)
	{
		consola(this);
		window[GlobalVar] = dtclickTr(window[tableId], this, evt);
	
		if(onClickCallBack)
			onClickCallBack();
	});
}
function tableFilter(tbObj, inputID)
{
	$(idJQuery(inputID)).focus();
	$(idJQuery(inputID)).off().on("keyup change",function()
	{		
		tbObj.search( this.value ).draw();
	});
}
function onSubmit(idForm, url, submitCallBack1)
{
	var idForm = "#"+idForm;
	$(idForm).off().on("submit",function(e)
	{
		e.preventDefault();
		if(!isset(url))
			window["url"] = $(this).attr("action");
		
		window["datos"] = $(this).serialize();
		
		if(submitCallBack1)
			submitCallBack1();
	});
}
function onSubmitAjax(idForm, url, datos, BFajaxCallBack, onSuccessCallBack)
{
	$(idJQ(idForm)).off().on("submit",function(e)
	{
		e.preventDefault();
		if(!isset(url))
			window["url"] = $(this).attr("action");
		else
			window["url"] = url;
		if(!isset(datos))
			window["datos"] = $(this).serialize();

		if(BFajaxCallBack)
			BFajaxCallBack(this);
		onAjax(window["url"], window["datos"], onSuccessCallBack);
	});
}
function onAjax(url, datos, callBackOnSuccess)
{
	$.ajax(
		{
			data: datos,
			type:  'POST',
			url: url,
			success: function(response)            
			{
				if(callBackOnSuccess)
					callBackOnSuccess(response);          
			}
		});
}
function onAjaxURL(url, callBack)
{
	$.ajax({
			type:  'POST',
			url: url,
			success: function(response)            
			{
				callBack(response);
			}
		});
}
function onAjaxBS(url, datos, callBackBeforeSend, callBackOnSuccess)
{
	$.ajax(
		{
			data:datos, type:'POST', url: url,
			beforeSend: function()
			{
				if(callBackBeforeSend)
					callBackBeforeSend();
			},
			success: function(response)            
			{
				if(callBackOnSuccess)
					callBackOnSuccess(response);          
			}
		});
}
function idJQ(id){var id = "#"+id;return id;}
function idJQuery(id){var id = "#"+id;return id;}
function showModal(modalId, modalCallBack)
{
	$(idJQ(modalId)).off().on('shown.bs.modal', function () {modalCallBack();}).modal("show");
}
function hideModal(modalId, modalCallBack)
{
	$(idJQ(modalId)).off().on('hidden.bs.modal', function () {if(isset(modalCallBack)) modalCallBack();}).modal("hide");
}
function loadingGif(divId){$(idJQ(divId)).html(gifAnimacion)};
function loadOnDiv(divId, url){$(idJQ(divId)).load(url);}
	
  function rElement(id)
  {
		var element = document.getElementById(id);
		return element;
  }
  function rTableTitles(table)
  {		
			var arrayC = [];
			for (i = 0; i < table.rows[0].cells.length; i++) 
			{
				arrayC[table.rows[0].cells[i].innerText] = table.rows[0].cells[i].innerText;
			}		
  }
  function separadorMiles(numero)
  {
			var separado = numeral(numero).format('0,0.0');
			return separado;
  }
  	function fadeInOut(id, inMs, outMs, limit)
  	{		
			$(idJQuery(id)).fadeIn(inMs);
			$(idJQuery(id)).fadeOut(outMs);
			limit--;
			if(limit>0)
				afterDelay(2000, fadeInOut(id, inMs, outMs));
	}
	function separadorMil(numero)
	{
		var separado = numeral(numero).format('0,0.0');
		return separado;
	}
	function prepareIMGs(inputID, globalVarName, alto, ancho, calidad, callBack)
    {
				var uploadImage = document.getElementById(inputID);
				if(uploadImage.files.length === 0){return;}
				let arrayObject = [];
				window[globalVarName] = 0;
        i = 0;
        cantidadFiles = uploadImage.files.length;
        for(i=0; i<cantidadFiles; i++)
        {
            var lectorR = new FileReader();
            lectorR.readAsDataURL(uploadImage.files[i]);
            readerF(globalVarName, lectorR, alto, ancho, calidad, callBack);
        }
        return arrayObject;
    }
	function readerF(globalVarName, objReader, alto, ancho, calidad, callBack)
	{
		objReader.onload = function (event)
		{
			var image = new Image();
			image.argumentos = this.argumentos;
			image.src = event.target.result;
			image.onload = function()
			{
				var canvas = document.createElement("canvas");
				var context = canvas.getContext("2d");
				//Aqui se hace el resize
				var MAX_WIDTH = ancho;
				var MAX_HEIGHT = alto;
				var width = image.width;
				var height = image.height;
				if(width > height)
				{
					if(width > MAX_WIDTH)
					{
						height *= MAX_WIDTH / width;
						width = MAX_WIDTH;
					}
				}
				else
				{
					if(height > MAX_HEIGHT)
					{
						width *= MAX_HEIGHT / height;
						height = MAX_HEIGHT;
					}
				}
				canvas.width = width;
				canvas.height = height;
				//Aqui se dibuja
				context.drawImage(image,0,0,canvas.width,canvas.height); //dibuja la image en el objeto context (dentro de objeto canvas)
								window[globalVarName] = canvas.toDataURL('image/jpeg',calidad);
								if(isset(callBack))
										callBack(window[globalVarName]);
			}
		};
	}
	
	function resizeImageOnChange(idForm, idFile, idLabel, divImg, globalName, alto, ancho, calidad, callBack)
	{
		jqIdLabel = idJQ(idLabel);
		jqDivImg = idJQ(divImg);
		jqForm = idJQ(idForm);
		jqIdFile = idJQ(idFile);
		$(jqIdFile).off().on("change",function()
		{
			$(jqIdFile).prop("disabled",true);
			$(jqIdLabel).prop("disabled",true);
			imagenHTML = $(jqDivImg).html();
			prepareIMGs(idFile, globalName, alto, ancho, calidad, callBack);
		});		
	}
	
	function elementHasClass(element, classe)
	{
		if(isset(element))
		{
			if(element.classList.contains(classe))
				return true;
			else
				return false;
		}
	}
	function play()
	{
		var audio = document.getElementById("audio");
		audio.play();
	}
	function clickOnParent(e)
	{
		let parentNode = e.target.parentNode;
		e.preventDefault();
		e.stopPropagation();
		parentNode.click();
	}
	function ignoreNclick(tag)//apparently to ignore <i> inside buttons
	{
		elements = document.getElementsByTagName(tag); 
		for(let i=0; i < elements.length; i++)
			elements[i].addEventListener("click",clickOnParent,true);
	}
	function descuartizarTIGO(str) 
	{
		var desconocido = [];
		var desconocido2 = [];
		var monto = [];
		var cuenta = [];
		var fecha = [];
		tamanho = str.length;
		for(i=0; i<tamanho; i++)
		{
			if(i<3)
				desconocido[i] = str[i];
			if(i>=3 && i <13)
				cuenta[i] = str[i];
			if(i>=16 && i <22)
				fecha[i] = str[i];
			if(i>=22 && i <32)
				monto[i] = str[i];
			if(i>=32)
				desconocido2[i] = str[i];
		}
		$("#codigo").val(str);
		$("#cuenta").val(cuenta.join(""));
		$("#montoCod").val(parseInt(monto.join("")));
		$("#vencimiento").val(fecha.join(""));
	}
	function lastBtn()
	{
		$("body").off().on("click","button",function()
		{
			window["lastBtn"] = this;
		});
	}
	function firstCellValue()
	{
		$("tr").off().on("click",function(e)
		{
			window[idF0] = this.firstElementChild.innerText;
				
		});
	}
	function returnNodeByCellValue(dtObject, colPosition, searchedValue)
	{
		var indexes = dtObject.rows().eq( 0 ).filter( function (rowIdx) 
		{
			return dtObject.cell( rowIdx, colPosition ).data() === searchedValue ? true : false;
		});
		console.log(dtObject.row(indexes).node());
		return dtObject.row(indexes).node();
	}
	function arrowDetectorCustom(parentElementID, tagToArray, classSelected, callBack)
	{
		var xModalx = document.getElementById(parentElementID);
		xModalx.addEventListener('keydown', function(e)
		{
			arrowFuncion(e, xModalx, tagToArray, classSelected, callBack);
			//e.stopPropagation();
		});	
	}
	function arrowFuncion(e, elemento, tagToArray, classSelected, callback)
	{
		if(e.key === 'Enter')
			callback();
		if(e.key === 'ArrowDown')
			listMover(elemento, tagToArray,classSelected,"+");
		if(e.key === 'ArrowUp')
			listMover(elemento, tagToArray,classSelected,"-");
	}
	function listMover(elemento, tagToArray, classSelected, sentido)
	{
		elemento.focus();
		var idxSelected = 1;
		var list = elemento.getElementsByTagName(tagToArray);
		var selected = elemento.getElementsByClassName(classSelected)[0];
		var dim = list.length;
		if(isset(selected))
		{
			listArray = Array.from(list);
			var idxSelected = listArray.indexOf(selected);
			idxSelected = sentidoContador(sentido, idxSelected, dim, 1);
			selectTr(list[idxSelected], classSelected);
			newSelected = list[idxSelected];
		}
		else
		{
			afterDelay(500, function()
			{
				selectTr(list[idxSelected], classSelected);
				newSelected = elemento.getElementsByClassName(classSelected)[0];
			});	
		}
	}
	function selectTr(tr, classe)
	{
		var prevSelected = tr.parentNode.getElementsByClassName(classe)[0];
		if(isset(prevSelected))
			removeClass(prevSelected, classe);
		addClass(tr, classe);
	}
	function sentidoContador(sentido, contador, dim, start)
	{
		if(sentido == "+")
		{
			if(contador < dim)
				contador++;
			if(contador == dim)
				contador = start;
		}
		if(sentido == "-")
		{
			if(contador >= start)
				contador--;
			if(contador < start)
				contador = dim-1;
		}
		return contador;
	}
	function notificar(objeto, callBack)
	{
		Push.create(objeto.titulo,
		{
			body: objeto.datos,
			icon: objeto.icono,
			timeout: objeto.tiempo,
			tag: objeto.tag,
			onClick: function ()
			{
				if(isset(callBack))
					callBack();
			}
		});
	}
	
	function gpsFullLinkToCoor(gpsLink)
	{//recibe link full de google maps y retorn objeto de latitud longitud
		try {
			var res = gpsLink.split("!3d");
			var coordenadas = res[1].split("!4d");
			consola(coordenadas);
			var lat = coordenadas[0];
			var coor = coordenadas[1].split("?");
			var lng = coor[0];
			var latlng = {lat:lat,lng:lng};
			consola(latlng);
			return latlng;
			}
			catch(err) {console.log("link no compatible");} 
	}
	function mapInfoWindowContent(title, subTitle)
	{
		var infowincontent = document.createElement('div');
		var strong = document.createElement('strong');
			strong.textContent = title;
			infowincontent.appendChild(strong);
			infowincontent.appendChild(document.createElement('br'));
		var text = document.createElement('text');
			text.textContent = subTitle;
			infowincontent.appendChild(text);
		return infowincontent;
	}
	function mapSetInfoWindow(infoWindow ,map, latLgn, mensaje)
	{
		if(!isset(window[infoWindow]))
			window[infoWindow] = new google.maps.InfoWindow;
		window[infoWindow].setPosition(latLgn);
		window[infoWindow].setContent(mensaje);
		window[infoWindow].open(map);
	}
	function getLocation(callBack)
	{
		if(navigator.geolocation)
		{
			navigator.geolocation.getCurrentPosition(function(position){callBack(position);});
		}
		else { console.log("NO AVAILABLE");}
	}
	const mapOptions1 = (latLng, zoom) =>
	{
		var mapOptions = {
			panControl: false,
			zoomControl: false,
			fullscreenControl: true,
			mapTypeControl: true,
			scaleControl: false,
			streetViewControl: false,
			overviewMapControl: false,
			rotateControl: false,
			center: new google.maps.LatLng(latLng.lat, latLng.lng),
			zoom: zoom
		};
		return mapOptions;
	}
	function map1Marker(mapName, divID, latLng, markerName, evtFuncName)
	{
		var mapOptions = {
			panControl: false,
			zoomControl: false,
			mapTypeControl: true,
			scaleControl: false,
			streetViewControl: false,
			overviewMapControl: false,
			rotateControl: false,
			center: new google.maps.LatLng(latLng.lat, latLng.lng),
			zoom:9
		};
		window[mapName] = new google.maps.Map(document.getElementById(divID), mapOptions1(latLng, 9));
		window[markerName] = newMapMarker(window[mapName], latLng);
		window[markerName].setMap(null);
		var trafficLayer = new google.maps.TrafficLayer();
		consola(trafficLayer);
        trafficLayer.setMap(window[mapName]);
		google.maps.event.addListener(window[markerName], 'position_changed', evtFuncName);
	}
	function updateInputsMaps() 
	{
		latLng = marker1.getPosition().toJSON();
		actualizarlatLngInput('latitud', 'longitud', latLng);
	}
	function changeMarkerPosition(map, marker, latLng)
	{//latLng es JSON {lat:,lng:}
		var latlng = new google.maps.LatLng(latLng.lat, latLng.lng); //no el mismo JSON
		marker.setPosition(latlng);
		marker.setMap(map);
		map.setZoom(10);
		map.setCenter(marker.getPosition());
	}
	function mapBounds(map)
	{
		var bounds  = new google.maps.LatLngBounds();
		var loc = new google.maps.LatLng(latLng.lat, latLng.lng);
		bounds.extend(loc);
		map.fitBounds(bounds); //autoZoom
		map.panToBounds(bounds); //AutoCenter
	}
	function actualizarlatLngInput(latID, longID, latLng)
	{
		document.getElementById(latID).value = latLng.lat;
		document.getElementById(longID).value = latLng.lng;
	}

	function mapRemoveMarker(marker){marker.setMap(null);}
	function mapDelMarker(marker){marker.setMap(null);delete marker;}
	function newMapMarker(map, latLng)
	{
		var marker = new google.maps.Marker({map: map, draggable: true, position: latLng});
		return marker;
	}
	function mapUpdateEvery()
	{
		timedBucle(5000, function()
		{
			getLocation(function(position)
			{
				pos = {lat: position.coords.latitude, lng: position.coords.longitude};
				mapSetInfoWindow("infoWindow" ,map, pos, "U r here");
				consola(position);
			});
		});
	}
	function appendArray(element, arrayElements)
	{
		if(is_array(arrayElements))
		{
			arrayElements.forEach(function(elem, index)
			{
				element.appendChild(elem);
			});
		}
		else
			element.appendChild(arrayElements);
	}
	function removeEveryChild(element)
	{
		var arrayE = HTMLCollectionToArray(element.children);
		if(is_array(arrayE))
		{
			arrayE.forEach(function(elem, index)
			{
				removeElement(elem);
			});
		}
	}
	function setArrayElements(parentNode, arrayE)
	{
		removeEveryChild(parentNode);
		appendArray(parentNode, arrayE);
	}
	function handleLocationError(browserHasGeolocation, infoWindow, pos)
	{
		infoWindow.setPosition(pos);
		infoWindow.setContent(browserHasGeolocation ?'Error: The Geolocation service failed.' :'Error: Your browser doesn\'t support geolocation.');
	}
	//////////////////////////////////////////
	//////////////////////////////////////////
	//////////////////////////////////////////
	function ajax(url, datos, callBack)
	{
		var xhttp = new XMLHttpRequest();
		xhttp.onreadystatechange = function()
		{
			if(this.readyState == 4 && this.status == 200)
			{
				callBack(this.response);
			}
		};
		xhttp.open("POST", url, true);
		xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xhttp.send(datos);
	}
	function requestXML(URLX, callBack)
	{
		var xmlhttp = new XMLHttpRequest();
		xmlhttp.onreadystatechange = function()
		{
			if(this.readyState == 4 && this.status == 200)
			{
				callBack(this.response);
			}
		};
		xmlhttp.open("GET",URLX,true);
		xmlhttp.send();
	}
	function downloadUrl(url, callback)
	{
		var request = window.ActiveXObject ? new ActiveXObject('Microsoft.XMLHTTP') : new XMLHttpRequest;
		request.onreadystatechange = function()
		{
			if(this.readyState == 4 && this.status == 200)
			{
				callback(this);
			}
		};
		request.open('GET', url, true);
		request.send();
	}
	function unShortURL(link, callBack)
	{
		ajax("https://paranasys.com/unshortURL.php?link="+link, "", callBack);
	}
	/////////////////////////////////////////
	/////////////////////////////////////////
	/////////////////////////////////////////
	/////////////////////////////////////////
	function attrsToObject(element)//return every attribute from element like object
	{
		var newObj = new Object();
		HTMLCollectionToArray(element.attributes).forEach(function(item){newObj[item.name] = item.value;});
		return newObj;
	}
	function mapDistanciaMultiple(mainMarker, arrayMarkers)
	{
		var arrayDistancias = [];
		var arrayNaN = [];
		var mainPos = mainMarker.getPosition();
		arrayMarkers.forEach(function(marker)
		{
			var disObj = new Object();
			disObj.distance = google.maps.geometry.spherical.computeDistanceBetween(mainPos, marker.getPosition());
			var kms = Math.round(disObj.distance / 1000 * 100) / 100;
			if(isNaN(kms))
				arrayNaN.push({sucursal:marker.title});
			else
				arrayDistancias.push({sucursal:marker.title, valor: kms});
		});
		return arrayDistancias;
	}
	function mapDistancia(arrayMarkers)
	{
		var disObj = new Object();
			disObj.distance = google.maps.geometry.spherical.computeDistanceBetween(arrayMarkers[0].getPosition(), arrayMarkers[1].getPosition());
			disObj.kms = function(){ return  Math.round(disObj.distance / 1000 * 100) / 100 ;}
		return disObj;
	}
	function mapSetPath(arrayMarkers)
	{
		if(!isset(poly))
			poly = new google.maps.Polyline({strokeColor: 'blue', strokeOpacity: 1.0, strokeWeight: 3, map: map,});
		var path = [arrayMarkers[0].getPosition(), arrayMarkers[1].getPosition()];
			poly.setPath(path);
	}
	
	function clearSelection()
	{
		window.getSelection().removeAllRanges();
	}
	
	function newArbolBinario(array)
	{
		var arbol = nuevoNodo(null, array[0]);
		array.forEach(function(item)
		{
			checkNodo(item, arbol);
		});
		return arbol;
	}
	function checkNodo(item, nodo)
	{
		itemVal = (isObject(item)) ?  item.valor : item;
		if(itemVal < nodo.valor)
		{
			if(nodo.ultimoIzquierda)
			{
				nodo.izquierda = nuevoNodo(nodo, item);
				nodo.ultimoIzquierda = false;
			}
			else
				checkNodo(item, nodo.izquierda);
		}
		if(itemVal > nodo.valor)
		{
			if(nodo.ultimoDerecha)
			{
				nodo.derecha = nuevoNodo(nodo, item);
				nodo.ultimoDerecha = false;
			}
			else
				checkNodo(item, nodo.derecha);
		}
	}
	function nuevoNodo(parent, value)
	{
		var ranking = [];
		var valor = (isObject(value)) ?  value.valor : value;
		var objeto = (isObject(value)) ?  value : {};
		var nodo = {valor:valor,objeto:objeto,izquierda:null,derecha:null,ultimoIzquierda:true,ultimoDerecha:true,parent:parent,pushed:false};
		nodo.closest = function(){ return ultimoIzquierda(nodo);}
		nodo.ranking = function(rank)
		{
			var c = 0;
			var ultimoDeIzquierda = ultimoIzquierda(nodo);
			ranking.push(ultimoDeIzquierda);
			ultimoDeIzquierda.pushed = true;
			while (c < rank-1)//menos 1 porque el primero ya hallo antes
			{
				var nLast = recorrerDerecha(ultimoDeIzquierda);
				ranking.push(nLast);
				nLast.pushed = true;
				ultimoDeIzquierda = nLast;
				c++;
			}
			return ranking;
		};
		return nodo;
	}
	function recorrerDerecha(nodo)
	{
		if(nodo.pushed)
		{
			if(isset(nodo.derecha))
			{
				if(nodo.derecha.pushed)
					return recorrerDerecha(nodo.parent);
				else
					return ultimoIzquierda(nodo.derecha);
			}
			else
				return recorrerDerecha(nodo.parent);
		}
		else
			return nodo;
	}
	function ultimoIzquierda(nodo)
	{
		if(isset(nodo.izquierda) && !nodo.pushed)
			return ultimoIzquierda(nodo.izquierda);
		else
			return nodo;
	}