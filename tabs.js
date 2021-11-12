const tabList = document.querySelector('[role="tablist"]')
const tabs = document.querySelectorAll('[role="tab"]')

tabList.addEventListener('keydown', changeTabFocus)

tabs.forEach(tab => {
    tab.addEventListener('click', showTabPanel)
})

let tabFocus = 0
function changeTabFocus(e) {
    // console.log(e.keyCode)
    const keydownRight = 39
    const keydownLeft = 37

        // change the tabindex of the current tab to -1
        if(e.keyCode === keydownLeft || e.keyCode === keydownRight) {
            tabs[tabFocus].setAttribute("tabindex", -1)
        
            // if right arrow key is push, move to right
            if(e.keyCode === keydownRight){
                tabFocus++
                if(tabFocus >= tabs.length) {
                    tabFocus = 0
                }
            }

            // if left arrow key is push, move to left
            else if(e.keyCode === keydownLeft){
                tabFocus--
                if(tabFocus < 0) {
                    tabFocus = tabs.length -1
                }
            }

            tabs[tabFocus].setAttribute("tabindex", 0)
            tabs[tabFocus].focus()

    }
}

function showTabPanel(e) {
    const targetTab = e.target
    const targetPanel = targetTab.getAttribute("aria-controls")
    const targetImage = targetTab.getAttribute("data-image")

    const tabsContainer = targetTab.parentNode
    const mainContainer = tabsContainer.parentNode

    tabsContainer.querySelector("[aria-selected='true']").setAttribute("aria-selected", false)
    targetTab.setAttribute("aria-selected", true)

        // mainContainer.querySelectorAll("[role='tab-panel']").forEach(panel => panel.setAttribute("hidden", true))
        // mainContainer.querySelector(`#${targetPanel}`).removeAttribute("hidden")
    hideContent(mainContainer, "[role='tab-panel']")
    showContent(mainContainer, `#${targetPanel}`)

        // mainContainer.querySelectorAll("picture").forEach(picture => picture.setAttribute("hidden", true))
        // mainContainer.querySelector(`#${targetImage}`).removeAttribute("hidden")
    hideContent(mainContainer, "picture")
    showContent(mainContainer, `#${targetImage}`)

    // console.log(panel)
}

function hideContent(parent, content) {
    parent
        .querySelectorAll(content)
        .forEach(item => item.setAttribute("hidden", true))
}

function showContent(parent, content){
    parent
        .querySelector(content)
        .removeAttribute("hidden")
}


