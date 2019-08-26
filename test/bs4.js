function newCardList(cardTitle)
{
	var div = cDiv();
		div.setAttribute("class","card");
		div.style.width = "auto";
	var divHeader = cDiv();
		divHeader.setAttribute("class","card-header");
		divHeader.innerHTML = cardTitle;
	var ul = cUL();
		ul.setAttribute("class","list-group list-group-flush");
		div.appendChild(divHeader);
		div.appendChild(ul);
	
		div.newLI = function(html)
		{
			var li = cLI();
				li.setAttribute("class","list-group-item");
				li.innerHTML = html;
			ul.appendChild(li);
		}

	return div;
}
function newInlineCheckBoxesBS4(title)
{
	var formGroup = newFormGroup();
		formGroup.setAttribute("class","input-group mb-3");
	var spanDiv = cDiv();
		spanDiv.setAttribute("class","input-group-prepend");
	var span = docCreateTag("span");
		span.setAttribute("class","input-group-text");
		span.innerHTML = title;
		spanDiv.appendChild(span);
		formGroup.appendChild(spanDiv);
		formGroup.style.border = "1px solid #ced4da";
		formGroup.newBox = function(label, id, value)
		{
			var div = cDiv();
			setAttribute(div, "class", "form-check form-check-inline");
			var nInput = newInput("checkbox", id, "", "", "", "");
				nInput.setAttribute("class", "form-check-input");
				nInput.value = (isset(value)) ? value : "";
				nInput.style.marginLeft = "10px";
			var boxLabel = newLabel("", "", "form-check-label", "");
				boxLabel.setAttribute("for",id);
				boxLabel.innerHTML = label;
				div.appendChild(nInput);
				div.appendChild(boxLabel);
				nInput.onclick = function()
				{
					if(nInput.checked)
						newEventCreator("checkeado", nInput);
					else
						newEventCreator("uncheckeado", nInput);
				}
				formGroup.appendChild(div);
				div.checked = (bol) => nInput.checked = bol;
				return div;
		}
	return formGroup;
}