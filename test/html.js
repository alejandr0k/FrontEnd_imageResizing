	btnAprobar = "<button type='button' class='btn btn-success aprobarC'>APROBAR</button>";
	btnCancelar = "<button type='button' class='btn btn-danger cancelC'>CANCELAR</button>";
	btnRechazar = "<button type='button' class='btn btn-danger rechazarC'>RECHAZAR</button>";
	btnFacturar = "<button class='btn btn-info facturarC' role='button'>FACTURAR</button>";
	btnReAjustar = "<button type='button' class='btn btn-warning reajustar'>REAJUSTAR</button>";
	btnVer = "<button type='button' class='btn btn-default verC'>Ver</button>";
	btnProrrogar = "<button type='button' class='btn btn-default prorrogarC'>PRORROGAR</button>";
	btnImprimirTicket = "<button type='button' class='btn btn-primary btn-xs ticketC'>TICKET</button>";
	btnImpPresTicket = "<button type='button' class='btn btn-default impC'><i class='fa fa-print impC' aria-hidden='true' style=' font-size: 12px;'></i></button>";
	btnImprimirDoc = "<button class='btn btn-info imprimirC' role='button'>IMPRIMIR</button>";
	btnImprimirRec = "<button target='_blank' href='' class='btn btn-info reciboC' role='button'>RECIBO</button>";
	btnProcesar = "<button type='button' class='btn btn-info procesarC'>PROCESAR</button>";
	btnFacturarT =  "<button class='btn btn-info facturarCT' role='button'>FACTURAR</button>";
	btnEditar = "<button type='button' class='btn btn-primary editarC'>EDITAR</button>";
	btnModificar = "<button type='button' class='btn btn-default editarC'>EDITAR</button>";
	btnBorrar = "<button type='button' class='btn btn-danger borrarS'>BORRAR</button>";
	btnAsignEnc = "<button type='button'class='btn btn-primary asigncarC'>Asignar Encargado</button>";
	btnGPS = "<button type='button' class='btn btn-success gpsC'>GPS</button>";
	btnIndividual = "<button type='button' class='btn btn-success individualc'>DESTINO INDIVIDUAL</button>";	
	btnVerPDF = "<button class='btn btn-info verPDF' role='button'>PDF</button>";
	btnDelPDF = "<button class='btn btn-danger delPDF'>DEL</button>";
	btnTipoProducto = "<button type='button' class='btn btn-success tipoC'> PRODUCTO </button>";
	btnTipoServicio = "<button type='button' class='btn btn-warning tipoC'> SERVICIO </button>";
	btnCerrarModal = createButton("button", "btn-default", "", "CERRAR");
	btnCerrarModal.setAttribute("data-dismiss","modal");
	btnCerrarModalx = createButton("button", "close", "", "x");
	btnCerrarModalx.setAttribute("data-dismiss","modal");
	const btnDelete = createButton("button", "btn-danger borrarC", "", "Borrar");
	btnCerrarModalHTML = "<button type='button' class='close' data-dismiss='modal'>×</button>";
	btnCancelarCuenta = "<button type='button' class='btn btn-warning btn-sm estadoC'>CANCELAR</button>";
	btnHabilitarCuenta = "<button type='button' class='btn btn-success btn-sm estadoC'>HABILITAR</button>";
	btnModificarCuenta = "<button type='button' class='btn btn-default btn-sm modificarC'> MODIFICAR </button>";
	btnAprobarAut = createButton("button", "btn-success botonAprobarM", "", "APPROVE");
	function generateTableHead(tableID, data, callBackTR, callBackTH) 
	{
		let table = document.getElementById(tableID);
		let arrayData = Object.keys(data);
		let thead = table.createTHead();
		row = thead.insertRow();
		if(isset(callBackTR))
			callBackTR();
		arrayData.forEach(function(element) 
		{
			th = document.createElement("th");
			let text = document.createTextNode(element);
			if(isset(callBackTH))
				callBackTH(element);
			th.appendChild(text);
			row.appendChild(th);
		});
	}
	function newTr(callBack)
	{
		tr = document.createElement("tr");
		tr.setAttribute("class","text-center");
		tr.style.marginTop = "5px";
		if(isset(callBack))
			callBack(tr);
		return tr;
	}
	function newCell(callBack)
	{
		td = document.createElement("td");
		if(isset(callBack))
			callBack(td);
		return td;
	}
	function nuevoFormulario(formID)
	{
		var newForm = document.createElement("form");
			newForm.setAttribute("id",formID);
			newForm.appendArray = function(eArray){eArray.forEach(function(element, index){newForm.appendChild(element);});};
			newForm.serialize = function(){return new URLSearchParams(Array.from(new FormData(this))).toString();};
			newForm.disableSubmit = function(){newForm.querySelectorAll('button[type=submit]')[0].disabled = true;};
			newForm.onSub = function(url, callBack)
			{
				newForm.addEventListener("submit", function(evt)
				{
					evt.preventDefault();
					newForm.disableSubmit();
					var datos = newForm.serialize();
					ajax(url, datos, function(respuesta)
					{
						callBack(respuesta);
						submit.disabled = false;
						newForm.reset();
					});
				}, true);
			};
		return newForm;
	}
	function newFormWithInputs(formID, arrayElements)
	{
		var newForm = nuevoFormulario(formID);
			newForm.appendArray(arrayElements);
		return newForm;
	}
	function newFormGroup()
	{
		var newFormGroup = document.createElement("div");
			newFormGroup.setAttribute("class","form-group");
			newFormGroup.insert = function(element){newFormGroup.appendChild(element);};
		return newFormGroup;
	}
	function newInputFGLabel(type, id, name, value, extraClass, labelText)
	{
		var newFormGroupX = newFormGroup();
		var arrayInputLabel = newInputWithLabel(type, id, name, value, extraClass, labelText);
		newFormGroupX.appendChild(arrayInputLabel[1]);
		newFormGroupX.appendChild(arrayInputLabel[0]);
		newFormGroupX.lectura = function(bool){arrayInputLabel[0].readOnly = bool;};
		return newFormGroupX;
	}
	function newInput(type, id, name, value, extraClass, callBack)
	{
		var nInput = document.createElement("input");
		nInput.setAttribute("type", type);
		if(isset(id))
			nInput.setAttribute("id", id);
		if(isset(name))
			nInput.setAttribute("name",name);
		else
			nInput.setAttribute("name",id);

		nInput.setAttribute("class","form-control");
		
		if(isset(extraClass))
		{
			var arrayXclass = extraClass.split(" ");
			arrayXclass.forEach(function(element)
			{
				addClass(nInput, element);
			});
		}
		
		if(isset(value))
			nInput.setAttribute("value",value);

		if(isset(callBack))
			callBack(nInput);
		return nInput;
	}
	function newInputWithLabel(type, id, name, value, extraClass, labelText)
	{
		var newInputX = newInput(type, id, name, value, extraClass, "");
		var newLabelX = newLabel(labelText, "", "", "");
			newLabelX.setAttribute("for", id);
			newLabelX.setAttribute("onselectstart", "return false");
			newInputX.lectura = function(booleano){newInputX.readOnly = booleano;};
		return [newInputX, newLabelX];
	}
	function newInputIMGbtn(id, labelText)
	{
		var formGroup = newFormGroup();
		var nLabel = newLabel(labelText, "LABEL"+id, "btn btn-block btn-default form-control", "");
		var inputIMG = newInput("file", id, id+"[]", "", "", "");
			inputIMG.setAttribute("class","");
			inputIMG.setAttribute("accept","image/*");
			inputIMG.setAttribute("style","display: none;");
			inputIMG.setAttribute("multiple","");
		nLabel.appendChild(inputIMG);
		formGroup.appendChild(nLabel);
		return formGroup;
	}
	function createButton(type, Class, id, text)
	{
		var btn = document.createElement("button");
		btn.type = type;
		btn.id = id;
		if(isset(Class))
			btn.setAttribute("class","btn "+Class);
		btn.innerText = text;
		btn.style.marginRight = 5;
		btn.style.marginLeft = 5;
		btn.style.marginLeft = 5;
		btn.style.marginTop = 5;
		btn.style.marginBot = 5;
		btn.hide = function(){btn.style.visibility = 'hidden';}
		btn.habilitado = function(booleano){btn.disabled = !booleano;}
		return btn;
	}
	function newSubmitButton(id, btnText)
	{
		var formGroup = newFormGroup();
		var btn = createButton("submit", "btn-default form-control", id, btnText);
		formGroup.appendChild(btn);
		formGroup.habilitado = function(booleano)
		{
			btn.habilitado(booleano);
		};
		return formGroup;
	}
	function newHiddenInput(val, id, name)
	{
		return rHiddenElement(val, id, name, "");
	}
	function rHiddenElement(val, id, name, classList)
	{
		var element = document.createElement("input");
		element.type = "hidden";
		element.value = val;
		element.name = name;
		element.id = id;
		if(isset(classList))
			element.setAttribute("class", classList);
		return element;
	}
	function setHiddenInput(targetID, inputID, inputVal)
	{
		inputElement = document.getElementById(inputID);
		if(!isset(inputElement))
			var inputElement = rHiddenElement(inputVal, inputID, inputID, " hdn");
		else
		{
			inputElement.id = inputID;
			inputElement.name = inputID;
			inputElement.value = inputVal;
		}
		append(targetID, inputElement);
	}
	function newHiddenNbutton(value, name, formId, labelText)
	{
		inputHidden(value, name, value, formId);
		var btnLista = createButton("button", " btn-success listaBtnC "+value, value, labelText);
		append(formId, btnLista);
	}
	function inputHidden(value, idName, classList, targetID)
	{
		var element = rHiddenElement(value, idName, idName, classList);
		append(targetID, element);
	}
	function newIframe(id, source, w, h)
	{
		var iframe = document.createElement('iframe');
			iframe.setAttribute("id", id);
			iframe.setAttribute("width", w);
			iframe.setAttribute("height", h);
			iframe.setAttribute("frameborder", 0);
			iframe.src = source;
			return iframe;
	}
	function appendNewFrame(id, source, w, h, targetID, callBack)
	{
		var iframe = newIframe(id, source, w, h);
		append(targetID, iframe);
		if(isset(callBack))
			callBack();
	}
	function newDivFormGroup(id, name, val, placeholder, xclass, required)
	{
		var divFG = document.createElement("div");
		divFG.setAttribute("class","form-group has-success");
		var label = document.createElement("label");
		label.setAttribute("class","control-label");
		label.setAttribute("for",id);
		label.innerHTML = placeholder;
		var input = newInput("text", id, id, val, xclass, "");
		input.setAttribute("placeholder", placeholder);
		input.required = required;
		divFG.appendChild(label);
		divFG.appendChild(input);
		return divFG;
	}
	function newSelectFGLabel(id, name, jsonArray, labelText)
	{
		var fg = newFormGroup();
		var select = newInputSelect(id, name, jsonArray);
			select.showPicker();
		var newLabelX = newLabel(labelText, "", "", "");
			newLabelX.setAttribute("for", id);
			newLabelX.setAttribute("onselectstart", "return false");
		fg.appendChild(newLabelX);
		fg.appendChild(select);
		fg.selectTitle = function(text){select.titulo(text);};
		return fg;
	}
	function newInputSelect(id, name, jsonArray)
	{
		var select = document.createElement('select');
			select.setAttribute("name", name);
			select.setAttribute("id", id);
			select.setAttribute("class","selectpicker");
			select.setAttribute("data-live-search","true");
			select.setAttribute("data-container","body");
			select.setAttribute("data-size","5");
			select.titulo = function(text){select.setAttribute("title", text);};
		jsonArray.forEach(function(element, index)
		{
			var option = document.createElement("option");
				option.setAttribute("value", element.val);
				option.innerText = element.text;
			if(isset(element.sub))
				option.setAttribute("data-subtext", element.sub);
			select.appendChild(option);
		});
		
		select.showPicker = function(){$("#"+id).selectpicker("show");};
		select.hidePicker = function(){$("#"+id).selectpicker("hide");};
		return select;
	}
	function newPanel(id, xHead, xBody, xFooter)
	{
		var panel = document.createElement('div');
		var panelHead = document.createElement('div');
		var panelBody = document.createElement('div');
		var panelFooter = document.createElement('div');
		
		panel.id = id;
		panel.className = 'panel panel-default';
		panelHead.className = 'panel-heading';
		panelBody.className = 'panel-body';
		panelFooter.className = 'panel-footer';

		if(isset(xHead))
			appendArray(panelHead, xHead);
		if(isset(xBody))
			appendArray(panelBody, xBody);
		if(isset(xFooter))
			appendArray(panelFooter, xFooter);

		panel.appendChild(panelHead);
		panel.appendChild(panelBody);
		panel.appendChild(panelFooter);
		
		panel.appendHead = function(elem){appendArray(panelHead, elem);}
		panel.appendBody = function(elem){appendArray(panelBody, elem);}
		panel.appendFooter = function(elem){appendArray(panelFooter, elem);}
		panel.setColor = function(color){panel.setAttribute("class","panel panel-"+color);};
		panel.setHead = function(element){setArrayElements(panelHead, element);};
		panel.setBody = function(element){setArrayElements(panelBody, element);};
		panel.setFooter = function(element){setArrayElements(panelFooter, element);};
		return panel;
	}
	function newPanelABM(idForm)
	{
		var panelSuccess = newPanel('panMay', "", "", "");
		panelSuccess.children[0].innerText = 'INSERTAR / GUARDAR';
		
		var inId = newInput("hidden", "id", "id", "", "", "");
		inId.disabled = true;
		
		document.getElementById('col6').appendChild(panelSuccess);
		var form = document.createElement('form');
		form.setAttribute("role","form");
		form.id = idForm;
		var divInput1 = newDivFormGroup("usuario", "USUARIO: ", "", "usuario", "", true);
		var divInput2 = newDivFormGroup("password", "PASS : ", "", "pass", "", true);
		var divInput4 = newDivFormGroup("nombres", "NOMBRES: ", "", "Ingresar NOMBRES", "focus", true);
		var divInput5 = newDivFormGroup("telefono", "TELEFONO: ", "", "Ingresar TELEFONO", "", false);
		form.appendChild(inId);
		form.appendChild(divInput1);
		form.appendChild(divInput2);
		form.appendChild(divInput4);
		form.appendChild(divInput5);
		panelSuccess.children[1].appendChild(form);
	}
	function newLabel(text, id, extraClass, callBack)
	{
		var nLabel = document.createElement("label");
		if(isset(extraClass))
			nLabel.setAttribute("class", extraClass);
		if(isset(id))
			nLabel.setAttribute("id",id);
		nLabel.innerHTML = text;
		//nLabel.innerText = text;

		if(isset(callBack))
			callBack(nLabel);
		return nLabel;
	}
	function newStrong(text, id, classe, callBack)
	{
		var nStrong = document.createElement("strong");
		nStrong.setAttribute("class",classe);
		if(isset(id))
			nStrong.setAttribute("id",id);
			nStrong.innerHTML = text;
			nStrong.innerText = text;
		if(isset(callBack))
			callBack(nStrong);
		return nStrong;
	}
	function generateTable(tbody, objeto)
	{
		let parametros = Object.keys(objeto);
		let row = tbody.insertRow();
		generateCells(parametros, row, objeto);
	}
	function generateCells(arrayCols, row, objeto)
	{
		arrayCols.forEach(function(item) 
		{
			let cell = row.insertCell();
			cell.innerHTML = objeto[item];
		});
	}
	function generateTableCB(tbody, objeto, callBackTR, callBackTD)
	{
		let parametros = Object.keys(objeto);
		row = tbody.insertRow();
		if(isset(callBackTR))
			callBackTR();
		generateCellsCB(parametros, row, objeto, callBackTD);
	}
	function generateCellsCB(arrayCols, row, objeto, callBackTD)
	{
		arrayCols.forEach(function(item) 
		{
			cell = row.insertCell();
			if(isset(callBackTD))
				callBackTD();
			cell.innerHTML = objeto[item];
		});
	}
	function createElementFromHTML(htmlString)
	{
		var td = document.createElement('td');
		td.innerHTML = htmlString;
		return td; 
	}
	function tableCreate(tableID, tableClasses, tbodyID, callBackTbl, callBackTbody)
	{
		tblG = document.createElement('table');
		tblG.id = tableID;
		tblG.setAttribute("class",tableClasses);
		if(isset(callBackTbl))
			callBackTbl(tblG);
		tbdyG = document.createElement('tbody');
		tbdyG.setAttribute("id",tbodyID);
		
		if(isset(callBackTbody))
			callBackTbody();
		
		tblG.appendChild(tbdyG);
		return tblG;
	}
	function TCgenerateTableHead(tblG, cols, callBackTR, callBackTH) 
	{
		thead = tblG.createTHead();
		row = thead.insertRow();
		if(isset(callBackTR))
			callBackTR();
		cols.forEach(function(element) 
		{
		
			th = document.createElement("th");
			let text = document.createTextNode(element);
			if(isset(callBackTH))
				callBackTH(th, element);
			th.appendChild(text);
			row.appendChild(th);
		});
	}
	function tableCreateF(tableID, tableClasses, tbodyID, cols, callBackTbl, callBackTTR, callBackTTH, callBackTbody)
	{
		tblG = document.createElement('table');
		tblG.id = tableID;
		tblG.setAttribute("class",tableClasses);
		if(isset(callBackTbl))
			callBackTbl(tblG);
		tbdyG = document.createElement('tbody');
		tbdyG.setAttribute("id",tbodyID);
		TCgenerateTableHead(tblG, cols, callBackTTR, callBackTTH);
		
		if(isset(callBackTbody))
			callBackTbody(tbdyG);
		
		tblG.appendChild(tbdyG);
		return tblG;
	}
	function appendModalF(appendID, modalID, inTitle, inputID, responseID, footerClose)
	{
		var modal = createModalF(modalID, inTitle, inputID, responseID, footerClose);
		append(appendID, modal);
	}
	function appendModalFilter(appendID, modalID, inTitle, inputID, responseID, url, footerClose)
	{
		var modal = createModalF(modalID, inTitle, inputID, responseID, footerClose);
		append(appendID, modal);
		textFilter(inputID, url, responseID, function(){});
	}
	const modalCFG1 = {x:true, footerClose:true, titulo:""};
	function createModalF(modalID, inTitle, inputID, responseID, footerClose)
	{
		var cfg = new Object();
			cfg.x = true;
			cfg.footerClose = footerClose;
			cfg.titulo = inTitle;
		var xBody = document.createElement('div');
		var inputText = newInput("text", inputID, "", "", "", "");
		var divBodyResponse = document.createElement('div');
			divBodyResponse.id = responseID;
			xBody.appendChild(inputText);
			xBody.appendChild(divBodyResponse);
		div = crearModal(modalID, "", xBody, "", cfg);
		return div;
	}
	function createModal(modalID, inTitle, bodyXelement, footerXelement, footerClose)
	{
		var cfg = new Object();
		cfg.x = true;
		cfg.footerClose = footerClose;
		cfg.titulo = inTitle;
		div = crearModal(modalID, "", bodyXelement, footerXelement, cfg);
		return div;
	}
	function crearBtnConModal(btnClass, modalID, btnText)
	{
		var btn = createButton("button", btnClass, "btn"+modalID, btnText);
		var nModal = crearModal(modalID, "", "", "", modalCFG1);
		btn.addEventListener("click", function()
		{
			nModal.toggle();
		}, true);
		var btnModal = {btn:btn,modal:nModal};
		btnModal.appendToID = function(divID)
		{
			append(divID,btnModal.btn);
			append(divID,btnModal.modal);
		};
		btnModal.appendToNode = function(Node)
		{
			Node.appendChild(btnModal.btn);
			Node.appendChild(btnModal.modal);
		};
		return btnModal;
	}
	function crearModal(modalID, xHeader, xBody, xFooter, cfg)
	{
		var div = document.createElement('div');
			div.setAttribute("class","modal");
			div.setAttribute("role","dialog");
			div.setAttribute("tabindex","-1");
			div.id = modalID;
		var divDialog = document.createElement('div');
			divDialog.setAttribute("class","modal-dialog");
		//CONTENT
		var divContent = document.createElement('div');
			divContent.setAttribute("class","modal-content");
		//HEADER
		var divHeader = document.createElement('div');
			divHeader.setAttribute("class","modal-header");
			if(isset(cfg.x))//cerrar con X en header
				if(cfg.x)
					divHeader.innerHTML = btnCerrarModalHTML;
			if(isset(xHeader))
				divHeader.appendChild(xHeader);
			if(isset(cfg.titulo))//Titulo en header
			{
				var modalTitle = document.createElement('h4');
				modalTitle.setAttribute("class","modal-title");
				modalTitle.innerHTML = cfg.titulo;
				divHeader.appendChild(modalTitle);
			}
		//BODY
		var divBody = document.createElement('div');
			divBody.setAttribute("class","modal-body");
			divBody.setAttribute("tabindex","-1");
			if(isset(xBody))
				divBody.appendChild(xBody);
		//FOOTER
		var divFooter = document.createElement('div');
			divFooter.setAttribute("class","modal-footer");
			if(isset(cfg.footerClose))
				if(cfg.footerClose)
					divFooter.appendChild(btnCerrarModal.cloneNode(true));
			if(isset(xFooter))
				divFooter.appendChild(xFooter);
		divContent.appendChild(divHeader);
		divContent.appendChild(divBody);
		divContent.appendChild(divFooter);
		divDialog.appendChild(divContent);
		div.appendChild(divDialog);

		div.setHead = function(element){setArrayElements(divHeader, element);};
		div.setBody = function(element){setArrayElements(divBody, element);};
		div.getBody = () => divBody;
		div.setFooter = function(element){setArrayElements(divFooter, element);};
		div.toggle = function(){$(div).modal("toggle");};
		div.ocultar = function(){$(div).modal("hide");};
		div.mostrar = function(){$(div).modal("show");};
		div.ocultado = function(callback){$(div).off().on('hidden.bs.modal', function () {callback();}).modal("hide");};
		div.mostrado = function(callback){$(div).off().on('shown.bs.modal', function () {callback();}).modal("show");};
		div.BackDropF = function(){ $(div).modal({backdrop: false});};
		div.BackDropS = function(){ $(div).modal({backdrop: "static"});};
		return div;
	}
	function createModal_append(divTarget, modalID, title, footerXelement, footerClose)
	{
		if(isset(footerXelement))
			var footerElement = footerXelement.cloneNode(true);
		else
			var footerElement = "";
		var modal = createModal(modalID, title, "", footerElement, true);
		append(divTarget, modal);
	}
	function innerHTMLmodalBody(modalID, HTML)
	{
		var modal = document.getElementById(modalID);
		var body = modal.children[0].children[0].children[1];
		body.innerHTML = HTML;
	}
	function modalElementByID(modalID, index)
	{//0 - header; 1 - body; 2- footer
		var modal = document.getElementById(modalID);
		var element = modal.children[0].children[0].children[index];
		return element;
	}
	function newTextArea(id, name, rows, labelText)
	{
		var formGroup = newFormGroup();
		var nlabel = newLabel(labelText, "", "", "");
			nlabel.setAttribute("for", id);
			nlabel.setAttribute("onselectstart", "return false");
		var textArea = docCreateTag("textarea");
			textArea.setAttribute("id", id);
			textArea.setAttribute("name", name);
			textArea.setAttribute("rows", rows);
			textArea.setAttribute("class", "form-control");
		formGroup.appendChild(nlabel);
		formGroup.appendChild(textArea);
		return formGroup;
	}
	////////////////////////////////////////////////////////////////////
	////////////////////////////////////////////////////////////////////
	function docCreateTag(tag){return document.createElement(tag);}
	function cH4(text){var h4 = docCreateTag('h4');h4.innerHTML = text;return h4;}
	function cDiv(){return docCreateTag('div');}
	function cUL(){return docCreateTag('ul');}
	function cLI(){return docCreateTag('li');}
	function cDivRow(objStyles)
	{
		var div = cDiv(); div.setAttribute("class","row");
		if(isset(objStyles))
		{
			Object.entries(objStyles).forEach(([key, val]) => 
			{
				div.style[key] = val;
			});
		}
		return div;
	}
	function cDivCol(objClass)
	{
		var div = cDiv(); div.setAttribute("class","col-"+objClass.tipo+"-"+objClass.size);
		return div;
	}
	////////////////////////////////////////////////////////////////////
	////////////////////////////////////////////////////////////////////
	function conversionPlugIn(divID, inputClass, btnXclass)
	{
		//DIV COL MD 2
		var div = document.createElement('div');
			div.setAttribute("class","col-md-12");
			div.id = divID;
		//DIV ROW 1 (titulos)
		var divR1 = cDiv();
			divR1.setAttribute("class","row");
			divR1.setAttribute("id","divR1");
		//DIV ROW 2 (Input y boton)
		var divR2 = cDiv();
			divR2.setAttribute("class","row");
			divR2.setAttribute("id","divR2");
		//Input
		var inputNumber = newInput("number", "", "", "", inputClass, "");
		var btnConvertir = createButton("button", "btn-default "+btnXclass, "", "CONVERTIR");
		//
		div.appendChild(divR1);
		div.appendChild(divR2);
		divR2.appendChild(inputNumber);
		divR2.appendChild(btnConvertir);
		//
		div.toGuarani = function()
		{
			div.setAttribute("procedure","toGuarani");
			divR1.innerHTML = "CONVERT TO GUARANI";
			removeClass(divR1, "text-success");
			addClass(divR1, "text-warning");
		}
		div.toUSD = function()
		{
			div.setAttribute("procedure","toUSD");
			divR1.innerHTML = "CONVERT TO USD";
			removeClass(divR1, "text-warning");
			addClass(divR1, "text-success");
		}
		div.setCambio = function(cambio){inputNumber.value = cambio;};
		div.getCambio = function(){return inputNumber.value;};
		div.getProcedure = function(){return div.getAttribute("procedure");};
		div.changeProcedure = function()
		{
			if(div.getProcedure() == "toUSD") div.toGuarani(); else div.toUSD();
		};
		return div;
	}
	
	function createRadioBtn(targetDiv, lab1ID, lab1TEXT, lab2ID, lab2TEXT, input1ID, input2ID, radioName)
	{
		create2Radios(targetDiv, "btn-success", "btn-warning", lab1ID, lab1TEXT, lab2ID, lab2TEXT, input1ID, input2ID, radioName, 1, 2);
	}
	function createRadioBtnDefaultA(targetDiv, lab1ID, lab1TEXT, lab2ID, lab2TEXT, input1ID, input2ID, radioName)
	{
		create2Radios(targetDiv, "btn-default", "btn-default", lab1ID, lab1TEXT, lab2ID, lab2TEXT, input1ID, input2ID, radioName, 1, 2);
	}
	function newLabelAsBtn(id, text, classe)
	{
		var lab1 = docCreateTag('label');
			lab1.setAttribute("class","btn btn-sm "+classe);
			lab1.id = id;
			lab1.innerHTML = text;
		return lab1;
	}
	function newRadioLabel(labID, labText, labClass, inputID, radioName, radioVal)
	{
		var lab = newLabelAsBtn(labID, labText, labClass);
		var input = createRadioInput(inputID, radioName, radioVal);
			lab.appendChild(input);
		lab.check = function()
		{
			lab.classList.add("active");
			input.checked = true;
		};
		return lab;
	}
	function newBtnGroup(colmdx)
	{
		var div = cDiv(); div.setAttribute("class", colmdx);
		var div0 = cDiv(); div0.setAttribute("class","btn-group"); div0.setAttribute("data-toggle","buttons");
		div.appendChild(div0);
		div.todiv0 = function(element){div0.appendChild(element);}
		return div;
	}
	function crear2Radios(lab1Class, lab2Class, lab1ID, lab1TEXT, lab2ID, lab2TEXT, input1ID, input2ID, radioName, radio1Val, radio2Val)
	{
		var div = newBtnGroup("col-md-12");
		var lab1 = newRadioLabel(lab1ID, lab1TEXT, lab1Class+" btn-on-3", input1ID, radioName, radio1Val);
		var lab2 = newRadioLabel(lab2ID, lab2TEXT, lab2Class+" btn-off-3", input2ID, radioName, radio2Val);
		lab2.check();
		div.todiv0(lab1);
		div.todiv0(lab2);
		return div;
	}
	function create2Radios(targetDiv, lab1Class, lab2Class, lab1ID, lab1TEXT, lab2ID, lab2TEXT, input1ID, input2ID, radioName, radio1Val, radio2Val)
	{
		var div = crear2Radios(lab1Class, lab2Class, lab1ID, lab1TEXT, lab2ID, lab2TEXT, input1ID, input2ID, radioName, radio1Val, radio2Val);
		append(targetDiv, div);
	}
	function createRadioInput(id, name, value)
	{
		var input = document.createElement("input");
			input.id = id;
			input.name = name;
			input.type = "radio";
			input.value = value;
		return input;
	}
	function createDivImgR(imgSrc, imgClass)
	{
		var div = document.createElement('div');
			div.setAttribute("class","col-md-4");
		var divT = document.createElement('div');
			divT.setAttribute("class","thumbnail");
			
		var img = document.createElement('img');
			img.setAttribute("class",imgClass);
			img.setAttribute("src",imgSrc);
		
		div.appendChild(divT);
		divT.appendChild(img);
		return div;
		//append(targetDiv,div);
	}
	function createInputImg64(name, value)
	{
		var input = document.createElement('input');
			input.setAttribute("type","hidden");
			input.setAttribute("name", name);
			input.setAttribute("value", value);
			return input;
	}
	function setInputIMGs(formId, divImg, imgSrc, imgClass, inputName)
	{
		var divImagen = createDivImgR(imgSrc, imgClass);
		var inputImagen = createInputImg64(inputName, imgSrc);
		append(formId, inputImagen);
		append(divImg, divImagen);
	}
	function addClassToAll(tag, classe)
	{
		var collection = document.getElementsByTagName(tag);
		var elementsArray = HTMLCollectionToArray(collection);
		elementsArray.forEach( element => addClass(element, classe));
	}
	function centerTH_TD(){addClassToAll("td", "text-center");addClassToAll("th", "text-center")}
	function getInputsFromElementIDByTag(elementID, tag)
	{
		var element = document.getElementById(elementID);
		var collectionInputs = element.getElementsByTagName(tag);
		var arrayInputs = HTMLCollectionToArray(collectionInputs);
		return arrayInputs;
	}
	function unselectableTextCSS(element)
	{
		element.style.WebkitUserSelect = "none"; // Chrome, Safari, Opera
		element.style.MozUserSelect = "none"; // Firefox
		element.style.msUserSelect = "none"; // IE 10+
		element.style.userSelect = "none"; // Standard syntax
	}
	function unselectableTextJS(element)
	{
		if(isset(element.style))
			element.style.userSelect = "none";
		element.onmousedown = () =>  false;
		element.onselectstart  = () =>  false;
	}
	function unselectableAllChilds(element)
	{
		unselectableTextJS(element);
		var arrChilds = element.childNodes;
			arrChilds.forEach((item) => unselectableAllChilds(item));
	}
	function newInlineCheckBoxes(title)
	{
		var formGroup = newFormGroup();
		var titleLabel = newLabel(title, "", "", "");
			formGroup.appendChild(titleLabel);
			formGroup.newBox = function(label, id, inputClass)
			{
				var boxLabel = newLabel("", "", "checkbox-inline", "");
				var nInput = newInput("checkbox", id, "", "", "", "");
					nInput.setAttribute("class", inputClass);
					nInput.style.marginLeft = "10px";
					boxLabel.appendChild(nInput);
					var text = docCreateTag("text");
						text.innerHTML = label;
						text.style.fontFamily = "arial"; 
					boxLabel.appendChild(text);
					nInput.onclick = function()
					{
						if(nInput.checked)
							newEventCreator("checkeado", nInput);
						else
							newEventCreator("uncheckeado", nInput);
					}
					formGroup.appendChild(boxLabel);
					boxLabel.checked = (bol) => nInput.checked = bol;
					return boxLabel;
			}
		return formGroup;
	}
	
	function newEventCreator(eventName, state)
	{
		var evt = new CustomEvent(eventName, { detail: state});
		window.dispatchEvent(evt);
	}