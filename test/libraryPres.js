	//******************************/
	//**************IDX
	//******************************/
	function verificarPendientes()
	{
		onAjax("index.php?check", "", function(response)
		{
			if(isset(response))
				$.globalEval(response);
		});
	}
	function verificarIDP()
	{
		onAjax("index.php?maximoID", {maximoID:maximoID}, function(response)
		{
			datos = parseInt(response); 
			if(datos > maximoID)
			{
				maximoID = datos;
				averiguarInfo(datos);
			}
		});
	}
	//******************************/
	rowInputs = {};
	Object.defineProperty(rowInputs, "contador", {enumerable: false, writable: true});
	Object.defineProperty(rowInputs, "start", {enumerable: false, writable: true});
	btnIndividual = createButton("button", "btn-success destinoC", "", "DESTINO INDIVIDUAL");
	btnAddIva = createButton("button", "btn-danger addIVA", "", "+10% IVA");
	btnTakeIva = createButton("button", "btn-info removeIVA", "", "Quitar IVA");
	function insertNewPresRow(c, tbody)
	{
		insertNewPresRowUPDT(c, tbody, "ITEM", 0, 0, 0, "DESTINO", 0, "" );
	}
	function insertNewPresRowUPDT(c, tbody, ITEM, itemVal, cantidad, precio, DESTINO, destinoVal, TOTAL )
	{
		let TRROW = trRow.cloneNode(true);
		TRROW.setAttribute("id",c);
		TRROW.appendChild(colItem(c, ITEM, itemVal));
		TRROW.appendChild(colCantidad(c, cantidad));
		TRROW.appendChild(colPrecio(c, precio));
		TRROW.appendChild(colDestino(c, DESTINO, destinoVal));
		TRROW.appendChild(colTotal(c, "", TOTAL));
		tbody.appendChild(TRROW);
	}
	function insertRowEntradaItem(c, tbody, ITEM, itemVal, cantidad, DESTINO, destinoVal)
	{
		let TRROW = trRow.cloneNode(true);
		TRROW.setAttribute("id",c);
		TRROW.appendChild(colItemFull(c, ITEM, itemVal));
		TRROW.appendChild(colCantidad(c, cantidad));
		TRROW.appendChild(colDestinoFull(c, DESTINO, destinoVal));
		tbody.appendChild(TRROW);
	}
	trRow = newTr(function()
	{
		tr.style.width = "25%";
		tr.setAttribute("class","text-center");
	});
	tdCell = newCell(function()
	{
		td.style.width = "25%";
		td.setAttribute("class","text-center text-success");
	});
	rowInputs.start = function(c) 
	{
		rowInputs.contador = c;
		rowInputs.ITEM = colItem(c, "ITEM", 0).outerHTML;
		rowInputs.CANTIDAD  = colCantidad(c, 0).outerHTML;
		rowInputs.PRECIO = colPrecio(c, 1500).outerHTML;  
		rowInputs.DESTINO= colDestino(c, "DESTINO", 0).outerHTML;
		rowInputs.TOTAL =  colTotal(c, "", "").outerHTML;
	}
	function colItem(id, label, value)
	{
		let cellUno = tdCell.cloneNode(true)
		let labelItem = newLabel(label, id, "etiqueta descProducto", "");
		cellUno.appendChild(labelItem);
		inputRow1 = newInput("hidden", id, "item"+id, value, "descProducto descProductoI", "");
		cellUno.appendChild(inputRow1);
		return cellUno;
	}
	function colItemFull(id, label, value)
	{
		let cellUno = tdCell.cloneNode(true)
		let labelItem = newLabel(label, id, "descProducto", "");
		cellUno.appendChild(labelItem);
		cellUno.setAttribute("class","etiqueta");
		inputRow1 = newInput("hidden", id, "item"+id, value, "descProductoI", "");
		cellUno.appendChild(inputRow1);
		return cellUno;
	}
	function colCantidad(id, cantidad)
	{
		let cellDos = tdCell.cloneNode(true)
		cellDos.style.width = "10%";
		cellDosInput = newInput("number", id, "cantidad"+id, cantidad, "cantidad text-center", "");
		cellDosInput.min=0;
		cellDos.appendChild(cellDosInput);
		return cellDos;
	}
	function colPrecio(id, precio)
	{
		let cellTres = tdCell.cloneNode(true)
		cellTres.style.width = "20%";
		cellTresInput = newInput("number", id, "precio"+id, precio, "precioC text-right", "");
		cellTresInput.min=0;
		cellTresInput.step=0.5;
		cellTres.appendChild(cellTresInput);
		return cellTres;
	}
	function colDestino(id, label, value)
	{
		let cell4 = tdCell.cloneNode(true)
		let labelItem = newLabel(label, id, "etiquetaSuc", "");
		input4 = newInput("hidden", id, "destino"+id, value, "destinoC", "");
		cell4.appendChild(labelItem);
		cell4.appendChild(input4);
		return cell4;
	}
	function colDestinoFull(id, label, value)
	{
		let cell4 = tdCell.cloneNode(true)
		let labelItem = newLabel(label, id, "labelSuc", "");
		input4 = newInput("hidden", id, "destino"+id, value, "destinoC", "");
		cell4.appendChild(labelItem);
		cell4.appendChild(input4);
		cell4.setAttribute("class","etiquetaSuc");
		return cell4;
	}
	function colTotal(id, label, value)
	{
		let cellTotal = tdCell.cloneNode(true)
		let labelItem = newLabel(label, id, "text-right", "");
		let strongItem = newStrong(value, id, "resultadoC", "");
		labelItem.appendChild(strongItem);
		cellTotal.appendChild(labelItem);
		return cellTotal;
	}
	function verPresupuesto(id, solicitante, url)
	{
		onAjax(url, {id:id,solicitante:solicitante}, function(response)
		{
			$("#modalMainBody").html(response);
			$("#modalMain").modal('show');
		});
	}
	function showPresupuesto(id)
	{
		onAjax("ver.php?n="+id, {id:id}, function(response)
		{
			$("#modalVerBody").html(response);
			$("#modalVerX").modal('show');
		});
	}
	function averiguarInfo(id)
	{
		onAjax("index.php?info", {id:id}, function(response)
		{
			datos = $.parseJSON(response);
			pushPresupuesto(datos);
		});
	}
	function pushPresupuesto(objDatos)
	{
		var evals = objDatos.evals;
		var evalsAprobado = objDatos.evalsAprobado;
		if(evals && evalsAprobado)
		{
			$.globalEval(evals);
			$.globalEval(evalsAprobado);
		}
		pJustificacion = objDatos.justificacion;
		pTitulo = objDatos.titulo;
		pOnClick = objDatos.onClick;
		myAudio.play();
		Push.create(pTitulo,
		{
			body: pJustificacion,
			icon: 'icono.png',
			timeout: 120000,
			tag: 'foo',
			onClick: function ()
			{
				window.focus();
				this.close();
				$.globalEval(pOnClick);
			}
		});
	}
	function buscarPresupuestoTes()
	{
		idPresupuesto = $(".idPresupuesto").val();
		onAjax("presupuestos.php?retornarSolicitante="+idPresupuesto, "", function(response)
		{
			solicitante = response;
			url = "ver.php?n="+idPresupuesto+"&s="+solicitante+"&estado";
			verPresupuesto(idPresupuesto, solicitante, url);
		});
	}
	function sumColumna(tablaObj, colToAdd)
	{
		miTablaLargor = tablaObj.rows.length;
		var sumaT = 0;
		for(var i = 1 ; i < miTablaLargor; i++)
		{
			var valueX = tablaObj.rows[i].cells[colToAdd].innerText;
			if(valueX)
				sumaT = sumaT + parseFloat(numeral(valueX).value());
		}
		var sumaT = separadorMil(sumaT);
		$("#totalLive").text(simboloMoneda+sumaT);
		$(".columnaTotal").text(simboloMoneda+sumaT);
	}
	function porCadaPrecio(formula)
	{
		$('.precioC').each(function(e)
		{
			e = e + 1;
			var idVar = "#"+(e);
			valor  = $(this).val();
			if(valor != 0)
			{
				var valorN = eval(formula);
				$(this).val(valorN.toFixed(2));
				calcTotal(idVar);
			}
		});
	}
	function calcTotal(idvar)
	{
		precio = $(idvar+".precioC").val();
		cantidad = $(idvar+".cantidad").val();
		
		total = parseFloat(precio)*parseFloat(cantidad);
		total = separadorMil(total.toFixed(2));
		$(idvar+".resultadoC").text(total);
		$(idvar+".resultadoC").text(total);
		sumColumna(miTabla, 4);
	}
	function checkUSD()
	{
		setHiddenInput("formulario", "idMoneda", 1);
		simboloMoneda = "$ ";
		$("#radio1Label").addClass("active");
		$("#radio2Label").removeClass("active");
		$("#radio1").prop("checked", true);
		window["submitURL"] = 'nuevoPresupuesto.php?insertar&m=1';
		$(".precioC").attr('step','0.1');
		$("#solicitudEn").text('Solicitar en U$D').addClass("bg-success").removeClass("bg-warning");
		//$("#panelPrincipal").attr('class','panel panel-success');
		panelPrincipal.setColor("success");
		$("#totalLive").css("color", "green");
		$(".columnaTotal").css("color", "green");
	}
	function checGS()
	{
		setHiddenInput("formulario", "idMoneda", 2);
		simboloMoneda = "Gs. ";
		window["submitURL"] = 'nuevoPresupuesto.php?insertar&m=2';
		$(".precioC").attr('step','1');
		$("#solicitudEn").text('Solicitar en Guaranies').addClass("bg-warning").removeClass("bg-success");
		$("#radio2Label").addClass("active");
		$("#radio1Label").removeClass("active");
		$("#radio2").prop("checked", true);
		//$("#panelPrincipal").attr('class','panel panel-warning');
		panelPrincipal.setColor("warning");
		$("#totalLive").css("color", "darkorange");
		$(".columnaTotal").css("color", "darkorange");
	}
function showAsApproved(objTabla, rowID)
{
	if(objTabla)
	{
		var rowID = "#"+rowID;
		var row = objTabla.row(rowID).node();
		dtSetClassToRow(objTabla, row, 'success APROBADO text-center');
		dtEditCell(objTabla, null, row, 2, 'APROBADO');
		dtEditCell(objTabla, null, row, 6, '');
		dtEditCell(objTabla, null, row, 7, '');
	}
}
function showAsProccessed(objTabla, rowID)
{
	if(objTabla)
	{
		var row = rowIdToRowNode(rowID);
		dtSetClassToRow(objTabla, row, 'info PROCESADO text-center');
		dtEditCell(objTabla, null, row, 2, 'PROCESADO');
		dtEditCell(objTabla, null, row, 6, btnVer+" "+btnImprimirDoc);
		dtEditCell(objTabla, null, row, 7, '');
		dtEditCell(objTabla, null, row, 8, '');
	}
}
function showAsProccessedInAuthorizations(objTabla, row)
{
	//var row = rowIdToRowNode(rowID);
	dtSetClassToRow(objTabla, row, 'info PROCESADO text-center');
	dtEditCell(objTabla, null, row, 2, 'PROCESADO');
	dtEditCell(objTabla, null, row, 6, '');
	dtEditCell(objTabla, null, row, 7, '');
	dtEditCell(objTabla, null, row, 8, '');
	dtEditCell(objTabla, null, row, 9, '');
}
function showAsApprovedInAuthorizations(objTabla, row, rowIdx)
{
	dtSetClassToRow(objTabla, row, 'success APROBADO');
	dtEditCell(objTabla, null, rowIdx, 2, 'APROBADO');
	dtEditCell(objTabla, null, rowIdx, 6, btnProrrogar);
	dtEditCell(objTabla, null, rowIdx, 7, '');
}
function showAsReproved(objTabla, rowID)
{
	if(objTabla)
	{
		var rowID = "#"+rowID;
		var row = objTabla.row(rowID).node();
		dtSetClassToRow(objTabla, row, 'danger RECHAZADO text-center');
		dtEditCell(objTabla, null, row, 2, 'RECHAZADO');
		dtEditCell(objTabla, null, row, 6, '');
		dtEditCell(objTabla, null, row, 7, '');
	}
}
function objTargetHasClass(classe){return elementHasClass(obj.target, classe);}
function editProcedure(idTable, url, callBack)
{
	if(objTargetHasClass("editarC"))
	{
		divTabla = document.getElementById(idTable);
		divTabla.style.opacity = 0.3;
		window["url"] = url+"?modificar";
		$("#id").val(obj.idC); 
		$("#id").attr("disabled",false);
		$(".focus").focus().select();
		if(isset(callBack))
			callBack();
	}
}
function editProcedureResponse(url)
{
	if(window["url"] == url+"?modificar")
		divTabla.style.opacity = 1;
	window["url"] = url+"?insertar";
	$("#id").attr("disabled",true);
	$("input").val('');
}
function updtColSucursales(idSucursal, nombreSucursal)
{
	$(".destinoC").val(idSucursal);
	$(".etiquetaSuc").html(nombreSucursal);
}

function NPdrawTable(callBackTbody)
{
	arrayCols = ["ITEM","CANTIDAD","PRECIO","DESTINO","TOTAL"];
	objTabla = tableCreateF(tablaId, "table table-hover table-striped", "tbodyTabla", arrayCols, "", "", function(th, element)
	{
		th.setAttribute("class","text-center");
		if(element == "TOTAL")
		{
			th.style.color = "orange";
			th.setAttribute("class","text-right columnaTotal");
		}
	}, function(tbdyG)
	{
		callBackTbody();
	});
}
function NEdrawTable(tablaID, tbodyID, divTargetID, rowQty)
{
	arrayCols = ["ITEM","CANTIDAD","DESTINO"];
	objTabla = tableCreateF(tablaID, "table table-hover table-striped", tbodyID, arrayCols, "", "", function(th, element)
	{
		th.setAttribute("class","text-center");
	}, function(tbdyG)
	{
		for(let i=0; i< rowQty; i++)
			insertRowEntradaItem(i, tbdyG, "PRODUCT", 0, 0, "DESTINATION", 0);
	});
	append(divTargetID, objTabla);
}
function NPdrawNewTbody()
{
	for(c = 1; c < cantidadFilas; c++)
	{
		insertNewPresRow(c, tbdyG);
	}
}
function NPdrawUpdtTbody()
{
	onAjaxURL(thisURL+"?load="+idP,function(response)
	{
		var obj = JSON.parse(response);
		lastIdx = cantidadRecs-1;
		for(c = 1; c < cantidadFilas; c++)
		{
			var i = c-1; //porque obj array comienza en 0
			if(c <= cantidadRecs)
				insertNewPresRowUPDT(c, tbdyG, obj[i].nombreItem, obj[i].idItem, obj[i].cantidad, obj[i].precio, obj[i].nombreSucursal, obj[i].idSucursal, obj[i].preciototal );
			else
				insertNewPresRowUPDT(c, tbdyG, "ITEM", 0, 0, 0, obj[lastIdx].nombreSucursal, obj[lastIdx].idSucursal, 0 );
		}
	});
}
function NPonClickTbody(tBodyID)
{
	$("#"+tBodyID).off().on('click','td',function(e) 
	{
		thisTR = this.closest("tr");
		id = thisTR.id;
		varLabel = this.querySelector("label");
		if(elementHasClass(varLabel, "etiqueta"))
		{
			showModal("modalProducto", function()
			{
				$('#textProducto').focus();
				$("#tablaX").off().on('click','.lineaC',function() 
				{
					selectTr(this, "success");
					idP = this.children[0].innerText;
					nombreP = this.children[1].innerText;
					uprecioP = this.children[2].innerText;
					setOnItem(idP, nombreP, uprecioP, miTabla, thisTR);
				});
			});
		}
		if(elementHasClass(varLabel, "etiquetaSuc"))
		{
			showModal("modalSucursal", function()
			{
				$('#textSucursal').focus();
				$("#tablaS").off().on('click','.lineaS',function() 
				{
					selectTr(this, "success");
					idS = this.children[0].innerText;
					nombreS = this.children[1].innerText;
					setOnDest(idS, nombreS, thisTR);
				});
			});
		}
	});
}
function setOnDest(idS, nombreS, thisTR)
{
	$("#enviarSubmit").prop("disabled",false);
	if(destinoIndividual == 0)
		updtColSucursales(idS, nombreS);
	else
	{
		thisTR.querySelector(".destinoC").value = idS;
		thisTR.querySelector(".etiquetaSuc").innerText = nombreS;
	}
	hideModal("modalSucursal", "");
}
function setOnItem(idItem, nombreItem, uprecioP, miTabla, thisTR)
{
	thisTR.querySelector(".etiqueta").innerText = nombreItem;
	thisTR.querySelector(".descProductoI").value = idItem;
	thisTR.querySelector(".precioC").value = uprecioP;
	thisTR.querySelector(".cantidad").value = "1";
	thisTR.querySelector(".resultadoC").innerText = separadorMil(uprecioP);
	sumColumna(miTabla, 4);
	hideModal("modalProducto", "");
}
function NPonClickTbodyTAG(tBodyID, selector)
{
	$("#"+tBodyID).off().on("click", selector, function(e) 
	{
		classse = e.target.classList;
		var parentTR = this.parentNode;
		consola(parentTR);
		if(classse.contains("etiqueta"))
		{
			input = this.getElementsByTagName("input")[0];
			label = this.getElementsByTagName("label")[0];
			consola("label defined");
			showModal("modalProducto", function()
			{
				$('#textProducto').focus();
				$("#tablaX").off().on('click','.lineaC',function() 
				{
					idP = $(this).attr("idP");
					nombreP = $(this).attr("nombrep");
					
					label.innerHTML = nombreP;
					input.value = idP;
					
					cellCantidad = parentTR.getElementsByClassName("cantidad")[0];
					cellCantidad.value = 1;
					parentTR.itemON = true;
					NPcheckFila(parentTR, enabledRows);
					hideModal("modalProducto", "");
				});
			});
		}
		if(classse.contains("etiquetaSuc"))
		{
			var input = this.getElementsByTagName("input")[0];
			var label = this.getElementsByTagName("label")[0];
			showModal("modalSucursal", function()
			{
				$('#textSucursal').focus();
				$("#tablaS").off().on('click','.lineaS',function() 
				{
					idS = $(this).attr("idS");
					nombreS = $(this).attr("nombreS");
					if(destinoIndividual == 0)
					{
						$(".destinoC").val(idS);
						$(".labelSuc").html(nombreS);
					}
					else
					{
						input.value = idS;
						label.innerHTML = nombreS;
					}
					$("#enviarSubmit").prop("disabled",false);
					parentTR.destinoON = true;
					NPcheckFila(parentTR, enabledRows);
					hideModal("modalSucursal", "");
				});
			});
		}
		$(".cantidad, .precioC").off().on('click keyup change',function() 
		{
			NPcheckFila(parentTR, enabledRows);
		});	
	});
}
function NPcheckFila(objFila, enabledRows)
{
	var cantidad = objFila.querySelector(".cantidad").value;
	var valDestino = objFila.querySelector(".destinoC").value;
	var ARenabledRows = [];
	if(objFila.itemON && valDestino != 0 && cantidad>0)
	{
		addClass(objFila, "success");
		ARenabledRows = document.querySelectorAll('.success');
		window["enabledRows"] = ARenabledRows.length;
	}
	if(cantidad == 0)
	{
		removeClass(objFila, "success");
		ARenabledRows = document.querySelectorAll('.success');
		enabledRows = ARenabledRows.length;
	}
	
	consola(enabledRows);	
}
function NPonClickClassRemove(imgClassEvt)
{
	$(document).on("contextmenu","."+imgClassEvt,function(e)
	{
		e.preventDefault();
		source = e.target.src;
		THIS = e.target;
		$(THIS).remove();
		$("[value = '"+source+"']").remove();
	});
}
function NPevents()
{
	$('.selectpicker').selectpicker();
	$(".destinoC").off().on("click",function()
	{
		destinoIndividual = 1;
		setClassToElement( btnIndividual, "btn btn-danger");
		btnIndividual.disabled = true;
	});
	$("#addLines").off().on("click",function()
	{
		insertNewPresRow(c, tbdyG);
		c = c + 1;
	});
	$("input[name='moneda']").on("change", function(e)
	{
		valor = $(this).attr('value');
		if(valor == '1')
		{
			checkUSD();
			plugInConversion.changeProcedure();
		}
		else
		{
			checGS();
			plugInConversion.changeProcedure();
		}
		sumColumna(miTabla, 4);
	});
	$(".addIVA").off().on('click',function() 
	{
		porCadaPrecio("parseFloat(valor)*parseFloat(1.1)");
	});
	$(".removeIVA").off().on('click',function() 
	{
		porCadaPrecio("parseFloat(valor)-(parseFloat(valor)/parseFloat(11))");
	});
	$(".convertirC").off().on('click',function() 
	{
		cotizacion = plugInConversion.getCambio();
		if(plugInConversion.getProcedure() == "toUSD")
		{
			porCadaPrecio("parseFloat(valor)/parseFloat(cotizacion)");
			checkUSD();
			plugInConversion.toGuarani();
		}
		else
		{
			if(plugInConversion.getProcedure() == "toGuarani")
			{
				porCadaPrecio("parseFloat(valor)*parseFloat(cotizacion)");
				checGS();
				plugInConversion.toUSD();
			}
		}
		sumColumna(miTabla, 4);
	});
	$(".proveedorC").off().on('click',function() 
	{
		showModal("modalProveedor",function()
		{
			$("#textoProv").focus();
			textFilter("textoProv", "buscarSucursal.php?ciudad&tp=7", "tablaProv", function()
			{
				var globalVarChar = "varTablaProv";
				tableOperationsGlobalVar(globalVarChar, "tablaSucursal", dtCFGSlim, "", function()
				{
					setHiddenInput(formID, "idProveedor", window[globalVarChar].idC);
					$("#proveedor").text(window[globalVarChar].array[1]);
					consola(window[globalVarChar].TrAttributes);
					hideModal("modalProveedor", "");
				});
			});
		});
	});
	$("#idRUCselect").change(function() 
	{
		setHiddenInput(formID, "idRUC", this.value);
	});
}
function NPoutsideEvents()
{
	$(document).on('keyup change',".cantidad, .precioC",function() 
	{
		var id = $(this).attr("id");
		var idvar = idJQuery(id);
		calcTotal(idvar);
	});
	resizeImageOnChange(formID, fileID, fileLabelID, divImagenesID, global64, 700, 700, 0.9, function()
	{
		setInputIMGs(formID, divImagenesID, window[global64], imgClassEvt, 'vector64[]');
		$("#"+fileID).prop("disabled",false);
		$("button").prop("disabled",false);
		$("#"+fileLabelID).prop("disabled",false);
	});
}
function NPrecover4update()
{
	onAjaxURL(thisURL+"?info="+idP,function(response)
	{
		var obj = JSON.parse(response);
		setText("justificacion", obj.justificacion);
		if(isset(obj.idRUC))
		{
			$('#idRUCselect').selectpicker('val', obj.idRUC);
			setHiddenInput(formID, "idRUC", obj.idRUC);
		}
		if(isset(obj.idProveedor))
		{
			setText("proveedor", obj.nombreProveedor);
			setHiddenInput(formID, "idProveedor", obj.idProveedor);
		}
		titleH1 = (obj.idmoneda == "1") ? checkUSD() : checGS();
	});
	onAjaxURL(thisURL+"?loadImgs="+idP,function(response)
	{
		jsonArray  = JSON.parse(response);
		jsonArray.forEach( function( item ) {
			toDataURL(item, function(response)
			{
				setInputIMGs(formID, divImagenesID, response, imgClassEvt, 'vector64[]');
			});
    	});
	});
}
function NPdrawHeader()
{
	var h1 = docCreateTag("h1");
		h1.id = 'solicitudEn';
	addClass(h1, "page-header");
	addClass(h1, "text-center");
	return h1;
}
function NPdrawHeadRows()
{
	var newRow = cDivRow({marginTop:"20px",textAlign:"center"});
	var divCol1 = cDivCol({tipo:"md",size:"3"});
		divCol1.id = "1a";
	var divCol2 = cDivCol({tipo:"md",size:"3"});
		divCol2.id = "1b";
	var divCol3 = cDivCol({tipo:"md",size:"3"});
		divCol3.id = "1c";
	var divCol4 = cDivCol({tipo:"md",size:"3"});
		divCol4.id = "totalLive";
		divCol4.style.fontSize = "36px";
	appendArray(newRow, [divCol1,divCol2,divCol3,divCol4]);
	return newRow;
}
function NPdrawBodyRows()
{
	var newRow = cDivRow({marginTop:"20px",textAlign:"center"});
		newRow.id = "presRow";
	var divCol1 = cDivCol({tipo:"lg",size:"12"});
		divCol1.appendChild(NPnuevoPresupuesto());
	appendArray(newRow, [divCol1]);
	return newRow;
}
function NPnewPresupuesto()
{
	capa = document.getElementById("capa");
	appendArray(capa, [NPdrawHeader(),NPdrawHeadRows(),NPdrawBodyRows()]);
	////
	//consola(NPdrawHeader());
	//consola(NPdrawHeadRows());
	//consola(NPdrawBodyRows());
	consola(capa);
}
function NPdrawPlugins()
{
	destinoIndividual = 0;
	var div2ID = "presRow";
	radioGroups = crear2Radios("btn-success","btn-warning","radio1Label","DOLARES", "radio2Label", "GUARANIES", "radio1", "radio2","moneda", 1, 2);
	append("1a", radioGroups);
	plugInConversion = conversionPlugIn("convPlugin", "cambioC", "convertirC");
	plugInConversion.toUSD();
	plugInConversion.setCambio(window["dolarVenta"]);
	append("1b", plugInConversion);

	appendModalF(div2ID, "modalProveedor", "PROVEEDOR", "textoProv", "tablaProv", true);	
	appendModalFilter(div2ID, "modalProducto", "ITEM", "textProducto", "tablaX", "buscarItem.php?cPrecio", true);
	appendModalFilter(div2ID, "modalSucursal", "SELECCIONAR DESTINO", "textSucursal", "tablaS", "buscarSucursal.php?ciudad", true);
	
	append("1c", btnAddIva);
	append("1c", btnTakeIva);
	append("1c", btnIndividual);
	rucList = newSelectFGLabel("idRUCselect", "idRUCselect", JSONrucs, "ESPECIFICAR RUC : ");
	rucList.selectTitle("SELECCIONAR RUC");
	append("paraSelect",rucList);
}
function NPdrawForm()
{
	var formulario = nuevoFormulario("formulario");
	var specials = docCreateTag("span");
		specials.setAttribute("class","row");
		specials.id = "specials";
		specials.style.textAlign = "center";
	var divTableRes = cDiv();
		divTableRes.id = "divTBL";
		divTableRes.setAttribute("class","table-responsive");
	var FGLines = newFormGroup();
	var inAddLines = createButton("button", "btn-default form-control", "addLines", "ADD LINES");
		FGLines.appendChild(inAddLines);
	var inJustificacion = newTextArea("justificacion", "justificacion", 3, "JUSTIFICACION : ");
	var inFotos = newInputIMGbtn('file', "SELECCIONAR FOTO");
	var FGsubmit = newFormGroup();
	var subButton = createButton("submit", "btn-default form-control", "enviarSubmit", "ENVIAR");
		subButton.habilitado(false);
		FGsubmit.appendChild(subButton);
	formulario.appendArray([specials,divTableRes,FGLines,inJustificacion,inFotos,FGsubmit]);
	return formulario;
}
function NPnuevoPresupuesto()
{
	var r1 = NPpanelBodyR1();
	var r2 = NPpanelBodyR2();
	var r3 = NPpanelBodyR3();
	panelHeadElement = document.createElement('h4');
		panelHeadElement.innerHTML = "INFORMACION DEL PRESUPUESTO";
	NPMainPanel = newPanel("panelPrincipal", panelHeadElement, [r1,r2,r3], "");
	return NPMainPanel;
}
function NPpanelBodyR1()
{
	var newRow = cDivRow({marginTop:"20px",textAlign:"center"});
	var divCol1 = cDivCol({tipo:"md",size:"6"});
	var labProveedor = newLabel("PROVEEDOR : ", 'proveedor', "", "");
	var buttonProveedor = createButton("button", "btn-default proveedorC", 'proveedor', "PROVEEDOR");
		buttonProveedor.style.color = "red";
		divCol1.appendChild(labProveedor);
		divCol1.appendChild(buttonProveedor);
	var divCol2 = cDivCol({tipo:"md",size:"6"});
		divCol2.id = "paraSelect";
	newRow.appendChild(divCol1);
	newRow.appendChild(divCol2);
	return newRow;
}
function NPpanelBodyR2()
{
	var newRow = cDivRow({marginTop:"20px",textAlign:"center"});
	var divCol1 = cDivCol({tipo:"lg",size:"12"});
		divCol1.id = "tryForm";
	var formulario = NPdrawForm();	
		divCol1.appendChild(formulario);
	newRow.appendChild(divCol1);
	return newRow;
}
function NPpanelBodyR3()
{
	var newRow = cDivRow({marginTop:"20px",textAlign:"center"});
	var divCol = cDivCol({tipo:"md",size:"12"});
		divCol.id = 'imagenes';
		newRow.appendChild(divCol);
	return newRow;
}
function NPonSubmit(url)
{
	onSubmitAjax(formID, url, "", function()
	{
	}, function(response)
	{
		$.globalEval(response);
	});
}
function createTable_tableEvents_tagEvents(tableID, tbodyID, formDivTable, numRows)
{
	NEdrawTable(tableID, tbodyID, formDivTable, numRows);
	NPonClickTbodyTAG(tbodyID, "td");
	ignoreNclick("label");
}
function divImagenesCMD12(divID)
{
	var divImagenes = document.createElement('div');
	divImagenes.setAttribute("class","col-md-12");
	divImagenes.setAttribute("id",divID);
	return divImagenes;
}
//////////////////////////////////////
//AUTORIZACIONES**********************
//////////////////////////////////////
function autorizationINIT()
{
	createModal_append("firstRow", modalFacturacion, "", divImagenesCMD12("imagenes"), true);
		var selectFoto = newInputIMGbtn("file", "SELECCIONAR FOTO");
		var submitElement = newSubmitButton("btnSubmit", "SUBIR");
		var formElement = newFormWithInputs("formUploadFile", [selectFoto,submitElement]);
		modalElementByID(modalFacturacion, 1).appendChild(formElement);
	createModal_append("firstRow", modalAprobarID, "Esta seguro de <b>aprobar</b> el presupuesto ?", btnAprobarAut, true);
	createModal_append("firstRow", modalReajustar, "", "", true);
		var nHidden = newInput("hidden", "id", "id", "", "", "");
		var inReajuste = newInputFGLabel("number", "reajuste", "reajuste", "", "", "VALOR");
		var frSubmit = newSubmitButton("btnSubmit", "REAJUSTAR");
		formReajustar = newFormWithInputs("formAjust", [nHidden,inReajuste,frSubmit]);
		modalElementByID(modalReajustar, 1).appendChild(formReajustar);
	createModal_append("firstRow", modalRechazo, "MOTIVO DE RECHAZO:", "", true);
		var inMotivo = newInputFGLabel("text", "motivo", "motivo", "", "", "MOTIVO:");
		var subRechazo = newSubmitButton("subRechazo", "RECHAZAR");
		var formRechazo = newFormWithInputs("formularioRechazo", [inMotivo,subRechazo]);
		modalElementByID(modalRechazo, 1).appendChild(formRechazo);
	createModal_append("firstRow", modalResumen, "Resumen de Presupuestos a Sucursal <button class='btn btn-info xPort'>PDF</button>", "", true);
	appendModalFilter("firstRow", modalSucursal, "SELECCIONAR SUCURSAL", "textSucursal", "tablaS", "buscarSucursal.php?ciudad", true);
}
function tableAutorizacionINITs(tablaAutor)
{
	dtUpdateCol(tablaAutor, 5, btnVer);
	dtUpdateColIfRowHasClass(tablaAutor, "PENDIENTE", 6, btnAprobar);
	dtUpdateColIfRowHasClass(tablaAutor, "PENDIENTE", 7, btnRechazar);
	dtUpdateColIfRowHasClass(tablaAutor, "APROBADO", 6, btnProrrogar);
	dtUpdateColIfRowHasClass(tablaAutor, "PROCESADO", 6, btnReAjustar);
	dtUpdateColIfRowHasClass(tablaAutor, "PROCESADO", 8, btnFacturar);
	dtSetClassRowIFmatchClass(tablaAutor, "PENDIENTE", "PENDIENTE warning");
	dtSetClassRowIFmatchClass(tablaAutor, "APROBADO", "APROBADO success");
	dtSetClassRowIFmatchClass(tablaAutor, "PROCESADO", "PROCESADO info");
	dtSetClassRowIFmatchClass(tablaAutor, "RECHAZADO", "RECHAZADO danger");
	dtSetClassRowIFmatchClass(tablaAutor, "FACTURADO", "FACTURADO default");
}
function modalResumenPresupuestos(getURL)
{
	showModal(modalSucursal, function()
	{
		$('#textSucursal').focus();
		$("#tablaS").off().on('click','tr',function() 
		{
			idSucursal = this.children[0].innerText;
			nombreSucursal = this.children[1].innerText;
			onAjaxURL("autorizaciones.php?"+getURL+"="+idSucursal, function(response)
			{
				hideModal(modalSucursal, function()
				{
					showModal(modalResumen, function()
					{
						innerHTMLmodalBody(modalResumen, response);
						if(isset(document.getElementById("nombreSucursal")))
							document.getElementById("nombreSucursal").innerHTML = nombreSucursal;
					});
				});
			});
		});
	});
}
function onClickedTRautorizaciones(obj)
{
	clickedObj = obj.target;
	if($(clickedObj).hasClass("verC"))
		showPresupuesto(obj.idC);
	
	if($(clickedObj).hasClass("verPDF"))
		newTab("documentos/"+obj.TrAttributes["documento"]);
	
	if($(clickedObj).hasClass("delPDF"))
	{
		onAjax("autorizaciones.php?delPDF="+obj.idC+"&documento="+obj.TrAttributes.documento, "", function(response)
		{
			loadOnDiv("capa","autorizaciones.php?dias=10");
		});
	}
	if($(clickedObj).hasClass("facturarC"))
	{
		modalElementByID(modalFacturacion, 0).innerHTML = "SUBIR FACTURA DE : "+obj.idC;
		showModal(modalFacturacion, function()
		{
			window["url"] = "autorizaciones.php?facturar&n="+obj.idC;
			onSubmit("formUploadFile", window["url"], function()
			{
				$("#btnSubmit").attr("disabled", true);
				hideModal(modalFacturacion, function()
				{
					onAjax(window["url"], window["datos"], function(response)
					{
						onAjax(response, "", function(response)
						{
							console.log(response);
							$.globalEval(response);
							setClassToElement( obj.thisTr, "default");
							$("#btnSubmit").attr("disabled", false);
							alert("FACTURA subida con exito");
						});
					});
				});
			});
		});
	}
	if($(clickedObj).hasClass("reajustar"))
	{
		attribValorTr = obj.thisTr.attributes.valor.value;
		showModal(modalReajustar,function()
		{
			modalElementByID(modalReajustar, 0).innerHTML = "REAJUSTAR PRESUPUESTO N:"+obj.idC;
			formReajustar[0].value = obj.idC;
			formReajustar[1].value = attribValorTr;
			onSubmitAjax('formAjust', 'autorizaciones.php?reajustar',"", function()
			{
				reajuste = $("#reajuste").val();
				datos = {id:obj.idC, reajuste:reajuste};
			}, function(response)
			{
				hideModal(modalReajustar,function()
				{
					$.globalEval(response);
				});
				
			});
		});
	}
	if($(clickedObj).hasClass("rechazarC"))
	{
		showModal(modalRechazo,function()
		{
			onSubmitAjax('formularioRechazo', "autorizaciones.php?rechazar&n="+obj.idC,"", "", function(response)
			{
				hideModal(modalRechazo,function()
				{
					$.globalEval(response);
				});
			});
		});
	}
	if($(clickedObj).hasClass("prorrogarC"))
		onAjaxURL("autorizaciones.php?prorrogar&n="+obj.idC, function(response){$.globalEval(response);});
	
	if($(clickedObj).hasClass("verRecibosC"))
	{
		onAjaxURL("autorizaciones.php?verRecibos&id="+obj.idC,function(response)
		{
			$('#modalReciboID').html(respuesta);
			$("#modalRecibos").modal("show");
		});
	}
	if($(clickedObj).hasClass("aprobarC"))
	{
		showModal(modalAprobarID, function()
		{
			modalElementByID(modalAprobarID, 1).innerHTML = "Seguro de Aprobar el Presupuesto N:"+obj.idC;
		});
	}
}
function onClickedButtonAutorizacion()
{
	$("button").off().on("click",function()
	{
		if(elementHasClass(this, "botonAprobarM"))
		{
			hideModal(modalAprobarID, function()
			{
				onAjaxURL("autorizaciones.php?aprobar="+obj.idC, function(response)
				{
					$.globalEval(response);
				});
			});
		}
		if(elementHasClass(this, 'bpdf'))
			pdfHTMLimgTable("PRESUPUESTO N"+obj.idC, "#modalVerBody");

		if(elementHasClass(this, 'xPort'))
			pdfHTML("#divTablaResumen", "RESUMEN_"+idSucursal+"_"+nombreSucursal, "tablaResumen");

		if(elementHasClass(this, "bDias"))
		{
			var dias = $("#dias").val();
			$('#capa').html('<div align="center"><img src="loading.gif"/></div>');
			$('#capa').load('autorizaciones.php?dias='+dias);
		}
		if(elementHasClass(this, "sucursalC"))
			modalResumenPresupuestos("resumen");
		if(elementHasClass(this, "sucursalPresDetallesC"))
			modalResumenPresupuestos("resumenDetallado");
	});
}
function appendIMGtoDIV_md4(divID, base64)
{
	var div = document.getElementById(divID);
	var colmd4 = document.createElement("div");
		colmd4.setAttribute("class","col-md-4");
	var img = document.createElement("img");
		img.setAttribute("class","img-thumbnail rightClick");
		img.setAttribute("src", base64);
	colmd4.appendChild(img);
	div.appendChild(colmd4);
}
function appendIMG64toFormByID(formID, inputName, base64)
{
	var form = document.getElementById(formID);
	var newInputX = newInput("hidden", "", inputName, base64, "", "");
	form.appendChild(newInputX);
}
/////////////////////////
//ITEMS//////////////****************************** */
////////////////////////
function abmItems(json)
{
	var nombre = newInputFGLabel("text", "nombre", "nombre", "", "primero", "Nombre:");
	var descripcion = newInputFGLabel("text", "descripcion", "descripcion", "", "", "Descripcion:");
	var costo = newInputFGLabel("number", "costo", "costo", "", "", "Costo:");
	var precio = newInputFGLabel("number", "precio", "precio", "", "", "Precio:");
	var categoria = newSelectFGLabel("categoria", "categoria", json, "CAT :");
	var submit = newSubmitButton("botonEnviar", "GUARDAR");
	var formulario = newFormWithInputs("formulario", [nombre,descripcion,costo,precio,categoria,submit]);
	return formulario;
}
function abmItemsPanel(json)
{
	var formulario = abmItems(json);
	var panel = newPanel("panelItems", "", formulario, "");
		panel.children[0].innerHTML = "ITEMS";
		addClass(panel.children[0], "text-center");
	return panel;
}
function abmItemsTableINIs(tablaItems)
{
	dtUpdateColIfRowHasClass(tablaItems, "1", 6, btnTipoProducto);
	dtUpdateColIfRowHasClass(tablaItems, "2", 6, btnTipoServicio);
	dtUpdateCol(tablaItems, 7, btnEditar);
}
function abmItemsOnClickTrEvent(obj)
{
	window["id"] = obj.idC;
	window["ARRAYROW"] = obj.array;
	if($(obj.target).hasClass("editarC"))
	{
		window["action"] = "modificar";
		$("#nombre").val(obj.array[1]);
		$("#descripcion").val(obj.array[2]);
		$('.selectpicker').selectpicker('val', obj.TrAttributes.idcategoria);
		$("#costo").val(obj.array[4]);
		$("#precio").val(obj.array[5]);
		$("#divTablaItems").hide();
		$(".primero").focus();
	}
	if($(obj.target).hasClass("tipoC"))
	{
		var tipoItem = obj.TrAttributes.tipoitem;
		onAjax("abmProductos.php?tipoItem", {id:id,tipoItem:tipoItem}, function(response)
		{
			$.globalEval(response);
		});
	}
}
function abmItemsFormEvent()
{
	onSubmitAjax("formulario", "abmProductos.php", "", function()
	{
		$(".btn").prop("disabled",true);
		window["url"] = "abmProductos.php"+"?"+window["action"];
		if(window["action"] == "modificar")
			window["datos"] = window["datos"] +"&id="+id;
	}, function(response)
	{
		window["action"] = "insertar";
		$(".btn").prop("disabled",false);
		$("input").val('');
		$("#divTablaItems").show();
		$.globalEval(response);
	});
}
function abmItemsInsertOnTable(tablaItems, json)
{
	var s = json;
	rowNode = dtInsertRowAndAttrib(tablaItems, [s.id,s.nombre,s.descripcion,s.nombreCategoria,s.costo,s.precio, btnTipoProducto, btnEditar,''], 'class', '1 text-center');
	rowNode.setAttribute('idcategoria',s.categoria);
	rowNode.setAttribute('tipoitem','1');
}
function abmItemsModifyOnTable(tablaItems, json)
{
	var s = json;
	window['ARRAYROW'][1] = s.nombre;
	window['ARRAYROW'][2] = s.descripcion;
	window['ARRAYROW'][3] = s.nombreCategoria;
	window['ARRAYROW'][4] = s.costo;
	window['ARRAYROW'][5] = s.precio;
	dtUpdateRow(tablaItems, obj.thisTr, window['ARRAYROW']);
}
function abmItemsTipo(tablaItems, json)
{
	var i = (json.tipoItem == "1") ? 2 : 1 ;
	var btn = (json.tipoItem == "1") ? btnTipoServicio : btnTipoProducto;
	setAttribute(obj.thisTr, 'class', i);
	setAttribute(obj.thisTr, 'tipoitem', i);
	dtEditCell(tablaItems, obj.thisCell, '', '', btn);
}

//////////////////////////////////////////////////////
/////////////////ABM SUCURSALES ***************************
/////////////////////////////////////////////////////////////
function setLatAndLong(linkID, latID, longID)
{
	$("#"+linkID).off().on("blur",function()
	{
		var gpsLink = document.getElementById(linkID).value;
		onAjax("abmsucursales.php?coordenadas", {gpsLink:gpsLink}, function(response)
		{
			if(isset(response))
			{
				consola(response);
				var coor = gpsFullLinkToCoor(response);
			}
			if(isset(coor))
			{
				consola(coor.lng);
				onAjaxURL("https://maps.googleapis.com/maps/api/geocode/json?latlng="+coor.lat+","+coor.lng+"&key=AIzaSyB_kO9Csc64Y1B83Mq2n3LCMfT9XusmvBw", function(googleJson)
				{
					consola(googleJson);
					document.getElementById("direccion").value = googleJson.results[0].formatted_address;
				});
				actualizarlatLngInput(latID, longID, coor);
				changeMarkerPosition(map, marker1, coor);
			}
		});
	});
}
function abmSucursalesModalAsignar(json)
{
	modalAsignar = crearModal("modalAsignar", "", "", "", modalCFG1);
	var idSucursal = newHiddenInput("", "idSucursal", "idSucursal");
	var usuarios = newSelectFGLabel("usuarios", "usuarios", json, "USUARIOS :");
	var submit = newSubmitButton("asignarB", "ASIGNAR");
	var formulario = newFormWithInputs("formAsignar", [idSucursal,usuarios,submit]);
	modalAsignar.setBody(formulario);
	append("firstRow", modalAsignar);
	onSubmitAjax("formAsignar", "abmsucursales.php?asignar", "", function()
	{
		modalAsignar.toggle();
	},function(idUser)
	{
		let userName = json.find(el => el.val == idUser);
		ARRAY[8] = userName.text;
		dtUpdateRowRNode(tablaSucursales, obj.thisTr, ARRAY);
		alert("Asignado exitosamente");
	});
}
function abmSucursales(json)
{
	var nombre = newInputFGLabel("text", "nombre", "nombre", "", "primero", "Sucursal :");
	var ubicacion = newInputFGLabel("text", "ubicacion", "ubicacion", "", "", "Ubicacion :");
	var direccion = newInputFGLabel("text", "direccion", "direccion", "", "", "Direccion :");
	var latitud = newInputFGLabel("text", "latitud", "latitud", "", "", "LATITUD : ");
	var longitud = newInputFGLabel("text", "longitud", "longitud", "", "", "LONGITUD : ");
	var ciudad = newSelectFGLabel("ciudad", "ciudad", json, "Ciudad :");
	var submit = newSubmitButton("botonEnviar", "GUARDAR");
	var formulario = newFormWithInputs("formSucursal", [nombre,ciudad,ubicacion,direccion,latitud, longitud, submit]);
	return formulario;
}
function abmSucursalesFormINI(urlLink, formID, appendID, titulo, funcABM)
{
	var formulario = document.getElementById(formID);
	if(isset(formulario))
	{
		var parentNode = formulario.parentNode;
			formulario.parentNode.removeChild(formulario);
			parentNode.appendChild(funcABM(jsonCiudades));
	}
	else
		document.getElementById(appendID).appendChild(abmSucursalesPanel(jsonCiudades, titulo, funcABM));
	window["action"] = "insertar";
	$(".btn").prop("disabled",false);
	var inputs = getInputsFromElementIDByTag(formID, "input");
	inputs[0].focus();
	$('.selectpicker').selectpicker();
	setLatAndLong("ubicacion", "latitud", "longitud");
	abmSucursalesOnSubmit(urlLink, formID, appendID, titulo, funcABM);
}
function abmSucursalesPanel(json, titulo, funcABM)
{
	var formulario = funcABM(json);
	var panel = newPanel("panelSucursales", "", formulario, "");
		panel.children[0].innerHTML = titulo;
		addClass(panel.children[0], "text-center");
	return panel;
}
function abmSucursalesTableINIs(tablaSucursales)
{
	dtUpdateCol(tablaSucursales, 3, btnGPS);
	dtUpdateCol(tablaSucursales, 7, btnEditar);
	//dtUpdateCol(tablaSucursales, 8, btnBorrar);
	dtUpdateCol(tablaSucursales, 9, btnAsignEnc);
	tableFilter(tablaSucursales, "nombre");
}
function abmSucursalesOnClickTrEvent(obj)
{
	idCiudad = obj.TrAttributes["idciudad"];
	ARRAY = obj.array;
	var tarGet = obj.target;
	if($(tarGet).hasClass("editarC"))
	{
		window["action"] = "modificar";
		setHiddenInput("formSucursal", "idS", ARRAY[0]);
		var inputs = getInputsFromElementIDByTag("formSucursal", "input");
		inputs[0].value = ARRAY[1].replace(/(<([^>]+)>)/ig,"");
		inputs[2].value = obj.TrAttributes["href"];
		inputs[3].value = ARRAY[4];
		inputs[4].value = ARRAY[5];
		inputs[5].value = ARRAY[6];
		if(isset(ARRAY[5]) && isset(ARRAY[6]))
			changeMarkerPosition(map, marker1, {lat:ARRAY[5], lng:ARRAY[6]});
		$('#ciudad').selectpicker('val', idCiudad);
		inputs[0].focus();
	}
	if($(tarGet).hasClass("borrarS"))
	{
		onAjaxURL("abmsucursales.php?borrar="+obj.idC, function(response)
		{
			$.globalEval(response);
		});
	}
	if($(tarGet).hasClass("asigncarC"))
	{
		var idSucursal = document.getElementById("idSucursal");
		idSucursal.value = obj.idC;
		$("#modalAsignar").modal('show');
	}
	if($(tarGet).hasClass("gpsC"))
	{
		if(isset(obj.TrAttributes["href"]))
			newTab(obj.TrAttributes["href"]);
	}
}
function abmSucursalesOnSubmit(urlLink, formID, appendID, titulo, funcABM)
{
	onSubmitAjax(formID, "", "", function()
	{
		$(".btn").prop("disabled",true);
		window["url"] = urlLink+window["action"]+"&tp="+tp;
		window["datos"] =  window["datos"]+"&tp="+tp;
	}, function(response)
	{
		consola(response);
		$.globalEval(response);
		abmSucursalesFormINI(urlLink, formID, appendID, titulo, funcABM);
	});
}
function abmSucursalesInsert(tablaSucursales, o)
{
	thisRow = dtInsertRowAndAttrib(tablaSucursales, [o.newId,o.nombre,o.nombreCiudad,btnGPS,o.direccion,o.latitud,o.longitud,btnEditar,btnBorrar,btnAsignEnc], 'id', o.newId);
	thisRow.setAttribute('href', o.ubicacion);
	thisRow.setAttribute('idciudad', o.ciudad);
	addClass(thisRow, 'text-center');
}
function abmSucursalesModificar(tablaSucursales, o)
{
	dtUpdateRow(tablaSucursales, obj.thisTr,[o.idS,o.nombre,o.nombreCiudad,btnGPS,o.direccion,o.latitud,o.longitud,btnEditar,ARRAY[8],btnAsignEnc]);
	obj.thisTr.setAttribute('href', o.ubicacion);
}
////////////////////////////////////*************************************** */
//////////////ABM CLIENTS 6////   PROVEEDORES 7/////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
function abmClients(json)
{
	var nombre = newInputFGLabel("text", "nombre", "nombre", "", "primero", "NOMBRE / EMPRESA :");
	var ruc = newInputFGLabel("text", "ruc", "ruc", "", "", "RUC : ");
	var telefono = newInputFGLabel("text", "telefono", "telefono", "", "", "TELEFONO : ");
	var ubicacion = newInputFGLabel("text", "ubicacion", "ubicacion", "", "", "Ubicacion :");
	var direccion = newInputFGLabel("text", "direccion", "direccion", "", "", "Direccion :");
	var latitud = newInputFGLabel("text", "latitud", "latitud", "", "", "LATITUD : ");
	var longitud = newInputFGLabel("text", "longitud", "longitud", "", "", "LONGITUD : ");
	var ciudad = newSelectFGLabel("ciudad", "ciudad", json, "Ciudad :");
	var submit = newSubmitButton("botonEnviar", "GUARDAR");
	var formulario = newFormWithInputs(formName, [nombre,ruc,telefono,ciudad,ubicacion,direccion,latitud, longitud, submit]);
	return formulario;
}
function abmClientsTableINI(tablaClientes)
{
	dtUpdateCol(tablaClientes, 9, btnEditar);
	dtUpdateCol(tablaClientes, 5, btnGPS);
}
function abmClientsOnClickTrEvent(obj)
{
	idCiudad = obj.TrAttributes["idciudad"];
		ARRAY = obj.array;
	var tarGET = obj.target;
	if(elementHasClass(tarGET, "editarC"))
	{
		window["action"] = "modificar";
		setHiddenInput(formName, "idS", ARRAY[0]);
		var inputs = getInputsFromElementIDByTag(formName, "input");
		inputs[0].value = ARRAY[1];
		inputs[1].value = ARRAY[2];
		inputs[2].value = ARRAY[3];
		$('#ciudad').selectpicker('val', idCiudad);
		inputs[4].value = obj.TrAttributes["href"];
		inputs[5].value = ARRAY[6];
		inputs[6].value = ARRAY[7];
		inputs[7].value = ARRAY[8];
		inputs[0].focus();
	}
	if(elementHasClass(tarGET, "gpsC"))
		newTab(obj.TrAttributes["href"]);
}
function abmClientsOnSubmit(urlLink, formID, appendID, titulo, funcABM)
{
	onSubmitAjax(formID, "", "", function()
	{
		$(".btn").prop("disabled",true);
		window["url"] = urlLink+window["action"]+"&tp="+tp;
		window["datos"] =  window["datos"]+"&tp="+tp;
	}, function(response)
	{
		$.globalEval(response);
		abmSucursalesFormINI(urlLink, formID, appendID, titulo, funcABM);
	});
}
function abmClientsModificar(tablaClientes, o)
{
	obj.array[1] = o.nombre;
	obj.array[2] = o.ruc;
	obj.array[3] = o.telefono;
	obj.array[4] = o.nombreCiudad;
	obj.array[6] = o.direccion;
	obj.array[7] = o.latitud;
	obj.array[8] = o.longitud;
	rnode = dtUpdateRowRNode(tablaClientes, obj.thisTr, obj.array);
	rnode.setAttribute('idciudad',o.ciudad);
	rnode.setAttribute('href',o.ubicacion);
}
function abmClientsInsertar(tablaClientes, o)
{
	rnode = dtInsertRowAndAttrib(tablaClientes, [o.idS,o.nombre,o.ruc,o.telefono,o.nombreCiudad,btnGPS,o.direccion,o.latitud,o.longitud,btnEditar],'class','text-center');
	rnode.setAttribute('ubicacion',o.ubicacion);
	rnode.setAttribute('idciudad',o.ciudad);
}
//////////////////////////////////////////////////////////////////////
////////////// ABM RUCs/////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
function abmRUCs()
{
	var denominacion = newInputFGLabel("text", "denominacion", "denominacion", "", "primero", "NOMBRE/DENOMINACION: :");
	var ruc = newInputFGLabel("text", "ruc", "ruc", "", "", "RUC : ");
	var empresa = newInputFGLabel("text", "empresa", "empresa", "", "", "EMPRESA / Nombre Comercial : ");
	var direccion = newInputFGLabel("text", "direccion", "direccion", "", "", "Direccion :");
	var submit = newSubmitButton("botonEnviar", "GUARDAR");
	var formulario = newFormWithInputs(formName, [denominacion,ruc,empresa,direccion,submit]);
	return formulario;
}
function abmRUCsPanel(titulo)
{
	var formulario = abmRUCs();
	var panel = newPanel("panelRUCs", "", formulario, "");
		panel.children[0].innerHTML = titulo;
		addClass(panel.children[0], "text-center");
	return panel;
}
function abmRUCsFormINI(urlLink, appendID, titulo)
{
	var formulario = document.getElementById(formName);
	if(isset(formulario))
	{
		var parentNode = formulario.parentNode;
			formulario.parentNode.removeChild(formulario);
			parentNode.appendChild(abmRUCs());
	}
	else
		document.getElementById(appendID).appendChild(abmRUCsPanel(titulo));
	window["action"] = "insertar";
	$(".btn").prop("disabled",false);
	var inputs = getInputsFromElementIDByTag(formName, "input");
	inputs[0].focus();
	
	abmRUCsOnSubmit(urlLink, appendID, titulo);
}
function abmRUCsOnSubmit(urlLink, appendID, titulo)
{
	onSubmitAjax(formName, "", "", function()
	{
		$(".btn").prop("disabled",true);
		window["url"] = urlLink+window["action"];
	}, function(response)
	{
		$.globalEval(response);
		abmRUCsFormINI(urlLink, appendID, titulo);
	});
}
function abmRUCsOnClickTrEvent(obj)
{
	ARRAY = obj.array;
	var tarGET = obj.target;
	if(elementHasClass(tarGET, "editarC"))
	{
		window["action"] = "modificar";
		setHiddenInput(formName, "id", ARRAY[0]);
		var inputs = getInputsFromElementIDByTag(formName, "input");
		inputs[0].value = ARRAY[1];
		inputs[1].value = ARRAY[2];
		inputs[2].value = ARRAY[3];
		inputs[3].value = ARRAY[4];
		inputs[0].focus();
	}
}
function abmRUCsTableINI(Table)
{
	dtUpdateCol(Table, 5, btnEditar);
}
function abmRUCsModificar(Table, o)
{
	obj.array[1] = o.denominacion;
	obj.array[2] = o.ruc;
	obj.array[3] = o.empresa;
	obj.array[4] = o.direccion;
	rnode = dtUpdateRowRNode(Table, obj.thisTr, obj.array);
}
function abmRUCsInsertar(Table, o)
{
	rnode = dtInsertRowAndAttrib(Table, [o.id,o.denominacion,o.ruc,o.empresa,o.direccion,btnEditar],'class','text-center');
}
//////////////////////////

function noAccess(){alert("NO TIENES PERMISOS SUFICIENTES PARA EDITAR");}