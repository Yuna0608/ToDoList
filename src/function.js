const addOrgImg = "./images/add.png";
const addHoverImg = "./images/addHover.png";
const editOrgImg = "./images/edit.png";
const editHoverImg = "./images/editHover.png";
const deleteOrgImg = "./images/delete.png";
const deleteHoverImg = "./images/deleteHover.png";
const doneOrgImg = "./images/done.png";
const doneHoverImg = "./images/doneHover.png";

initial();


function initial() {
    // add
    let addImgElement = document.querySelector("#addImg");
    if (addImgElement) {
        elementImageSet(addImgElement, addOrgImg, addHoverImg);

        // click
        addImgElement.addEventListener("click", () => {
            let ele = document.querySelector("#addContent");
            addItem(ele.value);
            ele.value = "";
        });
    }

    // edit
    let editImgElements = document.querySelectorAll(".edit");
    if (editImgElements.length > 0) {
        editImgElements.forEach(element => {
            elementImageSet(element, editOrgImg, editHoverImg);
        });
    }

    // delete
    let deleteImgElements = document.querySelectorAll(".delete");
    if (deleteImgElements.length > 0) {
        deleteImgElements.forEach(element => {
            elementImageSet(element, deleteOrgImg, deleteHoverImg);
        });
    }

    // done
    let denoImgElements = document.querySelectorAll(".done");
    if (denoImgElements.length > 0) {
        denoImgElements.forEach(element => {
            elementImageSet(element, doneOrgImg, doneHoverImg);
        });
    }

    // main
    let mainBlock = document.querySelector(".mainBlock");
    if (mainBlock) {
        mainBlock.addEventListener("click", function (event) {
            console.log(event);
            // find parent itemTmpBlock
            const itemTmpBlock = event.target.closest(".itemTmpBlock");
            if (event.target.classList.contains("edit")) {
                let input = itemTmpBlock.querySelector(".itemContent");
                input.readOnly = false;
                input.focus();
                input.select();
                // 指監聽一次，離開時所回readonly
                const onBlur = () => {
                    input.readOnly = true;
                    input.removeEventListener("blur", onBlur);
                };
                input.addEventListener("blur", onBlur);
            }
            else if (event.target.classList.contains("delete")) {
                if (itemTmpBlock)
                    itemTmpBlock.remove();
            }
            else if (event.target.classList.contains("done")) {
                if (itemTmpBlock) {
                    // edit hidden
                    let editEle = itemTmpBlock.querySelector(".edit");
                    editEle.classList.toggle("hidden");

                    //  add to waitBlock or doneBlock
                    const parentBlock = itemTmpBlock.closest("#waitBlock, #doneBlock");
                    itemTmpBlock.remove();
                    if (parentBlock.id === "waitBlock") {
                        elementImageSet(event.target, doneHoverImg, doneOrgImg);
                        let doneBLock = document.querySelector("#doneBlock");
                        doneBLock.appendChild(itemTmpBlock);
                    }
                    else if (parentBlock.id === "doneBlock") {
                        elementImageSet(event.target, doneOrgImg, doneHoverImg);
                        let waitBLock = document.querySelector("#waitBlock");
                        waitBLock.appendChild(itemTmpBlock);
                    }
                }
            }
        });
    }
}

function addItem(text) {
    if (!text) return;
    console.log(text);

    const tmp = document.querySelector("#itemTemplate");
    const tmpClone = tmp.content.cloneNode(true);
    tmpClone.querySelector(".itemContent").value = text;

    let editEle = tmpClone.querySelector(".edit");
    if (editEle) {
        elementImageSet(editEle, editOrgImg, editHoverImg);
    }

    let deleteEle = tmpClone.querySelector(".delete");
    if (deleteEle) {
        elementImageSet(deleteEle, deleteOrgImg, deleteHoverImg);
    }

    let doneEle = tmpClone.querySelector(".done");
    if (doneEle) {
        elementImageSet(doneEle, doneOrgImg, doneHoverImg);
    }
    document.querySelector(".itemsBlock").appendChild(tmpClone);
}

function elementImageSet(element, orgImg, hoverImg) {
    element.addEventListener("mouseenter", () => {
        element.src = hoverImg;
    });
    element.addEventListener("mouseleave", () => {
        element.src = orgImg;
    });
}