/**
 * A simple debug console which attaches to Core.Debug to provide
 * the capability to view messages printed with
 * <code>Core.Debug.consoleWrite()</code>.
 */
Echo.DebugConsole = {
        
    /** 
     * Flag indicating whether the debug console has been installed. 
     * @type Boolean
     */
    _installed: false,
    
    /** 
     * Flag indicating whether the console has been rendered on screen. 
     * @type Boolean
     */
    _rendered: false,
    
    /** 
     * The DOM element to which log messages should be appended. 
     * @type Element
     */
    _contentElement: null,
    
    /** 
     * The outer container DOM element of the rendered console. 
     * @type Element
     */
    _windowElement: null,
    
    /** 
     * Flag indicating whether the console is logging/processing output.
     * @type Boolean 
     */
    _logging: false,
    
    /** 
     * Flag indicating whether the console is maximized.
     * @type Boolean 
     */
    _maximized: false,
    
    /**
     * Attaches the Debug console to Core.Web, by overriding the implementation of 
     * <code>Core.Debug.consoleWrite()</code>.
     */
    install: function() {
        if (Echo.DebugConsole._installed) {
            return;
        }
        Core.Web.DOM.addEventListener(document, "keydown", Echo.DebugConsole._keyListener, false);
        Core.Debug.consoleWrite = Echo.DebugConsole._consoleWrite;
        
        if (document.URL.toString().indexOf("?debug") != -1) {
            Echo.DebugConsole.setVisible(true);
            Echo.DebugConsole._logging = true;
        }
        
        Echo.DebugConsole._installed = true;
    },
    
    /** Listener for click events from the "Clear" button: removes all content. */
    _clearListener: function() {
        while (Echo.DebugConsole._contentElement.firstChild) {
            Echo.DebugConsole._contentElement.removeChild(Echo.DebugConsole._contentElement.firstChild);
        }
    },
    
    /** Listener for click events from the close (X) button: sets display to none. */
    _closeListener: function() {
        Echo.DebugConsole._windowElement.style.display = "none";
    },
    
    /** Listener for click events from the maximize (^) button: toggles maximization state. */
    _maximizeListener: function() {
        Echo.DebugConsole._maximized = !Echo.DebugConsole._maximized;
        if (Echo.DebugConsole._maximized) {
            var height = document.height;
            height = height ? height : 600;
            var width = document.width;
            width = width ? width : 600;
            Echo.DebugConsole._windowElement.style.width = (width - 50) + "px";
            Echo.DebugConsole._titleBarElement.style.width = (width - 72) + "px";
            Echo.DebugConsole._contentElement.style.width = (width - 72) + "px";
            Echo.DebugConsole._windowElement.style.height = (height - 50) + "px";
            Echo.DebugConsole._contentElement.style.height = (height - 85) + "px";
        } else {
            Echo.DebugConsole._windowElement.style.width = "300px";
            Echo.DebugConsole._titleBarElement.style.width = "278px";
            Echo.DebugConsole._contentElement.style.width = "278px";
            Echo.DebugConsole._windowElement.style.height = "300px";
            Echo.DebugConsole._contentElement.style.height = "265px";
        }
    },
    
    /**
     * Method which will overwrite Core.Debug.consoleWrite().
     * 
     * @text {String} the text to output
     */
    _consoleWrite: function(text) {
        if (!Echo.DebugConsole._logging) {
            return;
        }
    
        if (!Echo.DebugConsole._rendered) {
            Echo.DebugConsole._render();
        }
        
        var lineElement = document.createElement("div");
        lineElement.appendChild(document.createTextNode(text));
        Echo.DebugConsole._contentElement.appendChild(lineElement);
        Echo.DebugConsole._contentElement.scrollTop = 10000000;
    },
    
    /** 
     * Listener for keyboard events (shows/hides console with Ctrl+Alt+C 
     */
    _keyListener: function(e) {
        e = e ? e : window.event;
        if (!(e.keyCode == 67 && e.ctrlKey && e.altKey)) {
            return;
        }
        
        Echo.DebugConsole._logging = true;
        Echo.DebugConsole.setVisible(!Echo.DebugConsole.isVisible());
    },
    
    /**
     * Queries the visibility of the console.
     * 
     * @return the console visibility state.
     * @type Boolean
     */
    isVisible: function() {
        if (!Echo.DebugConsole._rendered) {
            return false;
        }
        return Echo.DebugConsole._windowElement.style.display == "block";
    },
    
    /**
     * Renders the debug console to the screen.
     */
    _render: function() {
        Echo.DebugConsole._windowElement = document.createElement("div");
        Echo.DebugConsole._windowElement.id = "__DebugConsole__";
        Echo.DebugConsole._windowElement.style.cssText = 
                "display:none;position:absolute;top:20px;right:20px;width:300px;height:300px;background-color:#2f2f3f;" +
                "border:5px solid #3f6fff;overflow:hidden;z-index:32767;";
        
        Echo.DebugConsole._titleBarElement = document.createElement("div");
        Echo.DebugConsole._titleBarElement.style.cssText =
                "position:absolute;top:1px;left:1px;width:278px;height:3em;padding:3px 10px;background-color:#5f5f8f;" +
                "color:#ffffff;overflow:hidden;";
        Echo.DebugConsole._windowElement.appendChild(Echo.DebugConsole._titleBarElement);

        var titleDivElement = document.createElement("div");
        titleDivElement.style.cssText = "position:absolute;font-weight:bold;";
        titleDivElement.appendChild(document.createTextNode("Debug Console"));
        Echo.DebugConsole._titleBarElement.appendChild(titleDivElement);
    
        var controlsContainerDivElement = document.createElement("div");
        controlsContainerDivElement.style.cssText = "position:absolute;right:0;background-color:#5f5f8f;";
        Echo.DebugConsole._titleBarElement.appendChild(controlsContainerDivElement);
    
        var clearButtonElement = document.createElement("span");
        clearButtonElement.style.cssText = "padding:0 20px 0 0;cursor:pointer;";
        clearButtonElement.appendChild(document.createTextNode("[Clear]"));
        controlsContainerDivElement.appendChild(clearButtonElement);
        Core.Web.DOM.addEventListener(clearButtonElement, "click", Echo.DebugConsole._clearListener, false);
        
        var maximizeButtonElement = document.createElement("span");
        maximizeButtonElement.style.cssText = "padding:0 20px 0 0;cursor:pointer;";
        maximizeButtonElement.appendChild(document.createTextNode("[^]"));
        controlsContainerDivElement.appendChild(maximizeButtonElement);
        Core.Web.DOM.addEventListener(maximizeButtonElement, "click", Echo.DebugConsole._maximizeListener, false);
        
        var closeButtonElement = document.createElement("span");
        closeButtonElement.style.cssText = "padding:0 20px 0 0;cursor:pointer;";
        closeButtonElement.appendChild(document.createTextNode("[X]"));
        controlsContainerDivElement.appendChild(closeButtonElement);
        Core.Web.DOM.addEventListener(closeButtonElement, "click", Echo.DebugConsole._closeListener, false);
    
        Echo.DebugConsole._contentElement = document.createElement("div");
        Echo.DebugConsole._contentElement.style.cssText = 
                "font-family:monospace;font-size:9px;position:absolute;top:3em;left:1px;" +
                "width:278px;height:265px;padding:3px 10px;background-color:#1f1f2f;overflow:auto;color:#3fff6f;";
        Echo.DebugConsole._windowElement.appendChild(Echo.DebugConsole._contentElement);
        
        document.body.appendChild(Echo.DebugConsole._windowElement);
    
        Echo.DebugConsole._rendered = true;
    },
    
    /**
     * Sets the visibility of the console.
     * 
     * @param {Boolean} newValue the new console visibility state
     */
    setVisible: function(newValue) {
        if (!Echo.DebugConsole._rendered) {
            Echo.DebugConsole._render();
        }
        Echo.DebugConsole._windowElement.style.display = newValue ? "block" : "none";
    }
};
