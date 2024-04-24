import React , {useState , useEffect,  useReducer } from "react";
import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import TopMenu from "./components/TopMenu/TopMenu.js";
import AnquetteCard from "./components/AnquetteCard/AnquetteCard.js";
import RegistrationComponent from "./components/RegistrationComponent/RegistrationComponent.js";
import LoginComponent from "./components/LoginComponent/LoginComponent.js";
import AnquetteDetailed from "./components/AnquetteDetailed/AnquetteDetailed.js";
import AccountSettings from "./components/AccountSettings/AccountSettings.js";
import SearchByType from "./components/SearchByType/SearchByType.js";
import WhatIsAnquette from './components/WhatIsAnquette/WhatIsAnquette.js';
import AdminPanel from './components/AdminPanelComponents/AdminPanel/AdminPanel.jsx'
import AdminPanelLoginScreen from './components/AdminPanelComponents/AdminPanelLoginScreen/AdminPanelLoginScreen.jsx'
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import Fetch from './helpers/fetch.js';
export default function App () {
    let [users , setUsers] = useState([]);
    const [RerenderValue , ReRender] = useReducer(  x=> x+1, 0);
    
    // Я просто скопировал это из инте по этому не знаю как это работае. НО работает. 
     Array.prototype.includesObj = function(obj) {
       for(let i = 0; i < this.length; i++) {
           if(JSON.stringify(this[i],
               Object.keys(this[i]).sort()) === JSON.stringify(obj, Object.keys(obj).sort()))
               return true;
       }
       return false;
    }


    
    // Записывает данные с пользователями при перезагрузке с раницы 
    // в стейт Users из сессионного хранилища.  
    function SaveUsersToSessionStorage(){ 
            if(sessionStorage.Users == '[]' || sessionStorage.Users != undefined){ 
                setUsers(JSON.parse(sessionStorage.Users))
            }
    }

    useEffect(()=>{
        Fetch(
            "GET",
            undefined, 
            (json)=>{
            setUsers(json);
            sessionStorage.Users = JSON.stringify(json)
        })
        SaveUsersToSessionStorage();
    }, [RerenderValue])

    // Оно работает. По этому не трогаю.
        function PutNewPourtion(){ 
            function onlyNew(el){return !users.includesObj(el)
                }
            Fetch(
                "GET",
                undefined, 
                (json)=>{
                    let newAnquettes = json.filter(onlyNew)
                    setUsers([...users , ...newAnquettes])
                    const oldUsers = JSON.parse(sessionStorage.Users)
                    sessionStorage.Users = JSON.stringify([...oldUsers , ...newAnquettes]);
            })
        }


        return (
            <BrowserRouter>
                <div className="App">
                    <TopMenu
                        ReRenderValue={RerenderValue}
                    />
                <Container>
                            <Routes>
                                <Route 
                                   path="/SearchByType"
                                   element={<SearchByType users={users} />}
                                />
                               <Route 
                                   path="/"
                               element={
                                   <AnquetteCard 
                                        users={users}
                                        PutNewPourtion={PutNewPourtion}
                                   />
                               }
                               />
                                <Route 
                                    path="/Registration"
                                    element={<RegistrationComponent ReRender={ReRender}/>}
                                />
                                <Route
                                    path="/Login"
                                    element={<LoginComponent ReRender={ReRender} />}
                                />
                                <Route
                                    path="/:key"
                                    element={<AnquetteDetailed users={users}/>}
                                />
                                <Route
                                    path="/AccountSettings"
                                    element={<AccountSettings ReRender={ReRender}/>} 
                                />
                                <Route 
                                    path="/WhatIsAnquette"
                                    element={<WhatIsAnquette/>}
                                />
                                <Route 
                                    path="/AdminPanel"
                                    element={<AdminPanel/>}
                                />
                                <Route 
                                    path="/AdminPanelLoginScreen"
                                    element={<AdminPanelLoginScreen/>}
                                />
                                
                            </Routes>
                    </Container>
                    <div className="footer">
                        <div>
                            <a href="https://www.freepik.com/free-photo/beautiful-shot-top-mountain_11111354.html#query=picks&position=0&from_view=search&track=sph&uuid=218e7aa6-c4a0-43bd-8f30-1d81ad3084bb">Image by wirestock</a> on Freepik
                        </div>
                        <div>
                            <a target="_blank" href="https://icons8.com/icon/15108/handwritten-ocr">Handwritten OCR</a> icon by 
                            <a target="_blank" href="https://icons8.com">Icons8</a>
                        </div>
                        <div>
                            <a target="_blank" href="https://icons8.com/icon/3059/undo">Undo</a> icon by
                            <a target="_blank" href="https://icons8.com">Icons8</a>
                        </div>
                    </div>
                </div>
            </BrowserRouter>
        );
}



times in msec
 clock   self+sourced   self:  sourced script
 clock   elapsed:              other lines

000.018  000.018: --- NVIM STARTING ---
000.199  000.182: event init
000.270  000.071: early init
000.317  000.047: locale set
000.361  000.044: init first window
000.570  000.209: inits 1
000.589  000.019: window checked
000.591  000.002: parsing arguments
001.005  000.091  000.091: require('vim.shared')
001.096  000.034  000.034: require('vim._options')
001.098  000.090  000.056: require('vim._editor')
001.099  000.215  000.034: require('vim._init_packages')
001.100  000.295: init lua interpreter
001.155  000.055: expanding arguments
001.192  000.037: inits 2
001.465  000.273: init highlight
001.466  000.001: waiting for UI
001.703  000.237: done waiting for UI
001.726  000.023: clear screen
001.903  000.177: init default mappings & autocommands
002.464  000.052  000.052: sourcing /snap/nvim/2819/usr/share/nvim/runtime/ftplugin.vim
002.537  000.026  000.026: sourcing /snap/nvim/2819/usr/share/nvim/runtime/indent.vim
004.081  000.142  000.142: require('packer.util')
004.111  001.225  001.084: require('packer')
004.304  000.191  000.191: require('packer.log')
004.663  000.100  000.100: require('packer.async')
004.858  000.058  000.058: require('packer.result')
004.861  000.196  000.138: require('packer.jobs')
004.865  000.541  000.246: require('packer.plugin_utils')
005.068  000.193  000.193: require('packer.snapshot')
005.438  000.212  000.212: require('telescope.builtin')
005.447  000.006  000.006: require('vim.keymap')
005.522  002.938  000.569: sourcing /home/hyperpc/.config/nvim/init.lua
005.529  000.610: sourcing vimrc file(s)
005.758  000.159  000.159: sourcing /snap/nvim/2819/usr/share/nvim/runtime/filetype.lua
005.926  000.078  000.078: sourcing /snap/nvim/2819/usr/share/nvim/runtime/syntax/synload.vim
006.038  000.253  000.175: sourcing /snap/nvim/2819/usr/share/nvim/runtime/syntax/syntax.vim
007.219  000.141  000.141: sourcing /snap/nvim/2819/usr/share/nvim/runtime/plugin/gzip.vim
007.252  000.012  000.012: sourcing /snap/nvim/2819/usr/share/nvim/runtime/plugin/health.vim
007.745  000.161  000.161: sourcing /snap/nvim/2819/usr/share/nvim/runtime/pack/dist/opt/matchit/plugin/matchit.vim
007.842  000.573  000.412: sourcing /snap/nvim/2819/usr/share/nvim/runtime/plugin/matchit.vim
007.987  000.128  000.128: sourcing /snap/nvim/2819/usr/share/nvim/runtime/plugin/matchparen.vim
008.377  000.369  000.369: sourcing /snap/nvim/2819/usr/share/nvim/runtime/plugin/netrwPlugin.vim
008.642  000.010  000.010: sourcing /home/hyperpc/.local/share/nvim/rplugin.vim
008.650  000.229  000.219: sourcing /snap/nvim/2819/usr/share/nvim/runtime/plugin/rplugin.vim
008.745  000.074  000.074: sourcing /snap/nvim/2819/usr/share/nvim/runtime/plugin/shada.vim
008.803  000.021  000.021: sourcing /snap/nvim/2819/usr/share/nvim/runtime/plugin/spellfile.vim
008.965  000.123  000.123: sourcing /snap/nvim/2819/usr/share/nvim/runtime/plugin/tarPlugin.vim
009.125  000.100  000.100: sourcing /snap/nvim/2819/usr/share/nvim/runtime/plugin/tohtml.vim
009.198  000.027  000.027: sourcing /snap/nvim/2819/usr/share/nvim/runtime/plugin/tutor.vim
009.406  000.164  000.164: sourcing /snap/nvim/2819/usr/share/nvim/runtime/plugin/zipPlugin.vim
010.681  000.069  000.069: require('github-theme.lib.collect')
010.784  000.100  000.100: require('github-theme.util')
010.843  000.335  000.166: require('github-theme.config')
010.848  000.932  000.597: require('github-theme')
010.967  000.108  000.108: require('github-theme.override')
011.115  000.068  000.068: require('github-theme.lib.hash')
011.237  000.116  000.116: require('github-theme.util.deprecation')
011.291  000.051  000.051: require('github-theme.lib.deprecation')
012.329  000.095  000.095: require('github-theme.autocmds')
012.343  000.972  000.877: sourcing /home/hyperpc/.local/share/nvim/site/pack/packer/start/github-nvim-theme/colors/github_light.vim
012.359  002.863  000.616: sourcing /home/hyperpc/.config/nvim/plugin/packer_compiled.lua
012.649  000.047  000.047: sourcing /snap/nvim/2819/usr/share/nvim/runtime/plugin/editorconfig.lua
012.801  000.083  000.083: sourcing /snap/nvim/2819/usr/share/nvim/runtime/plugin/man.lua
012.897  000.058  000.058: sourcing /snap/nvim/2819/usr/share/nvim/runtime/plugin/nvim.lua
012.913  001.964: loading rtp plugins
013.253  000.051  000.051: sourcing /home/hyperpc/.local/share/nvim/site/pack/packer/start/github-nvim-theme/plugin/github_theme.vim
014.292  000.129  000.129: require('nvim-treesitter.utils')
016.105  000.177  000.177: require('vim.treesitter.language')
016.117  000.498  000.321: require('vim.treesitter.query')
016.229  000.110  000.110: require('vim.treesitter._range')
016.237  001.012  000.404: require('vim.treesitter.languagetree')
016.244  001.255  000.243: require('vim.treesitter')
017.156  002.860  001.606: require('nvim-treesitter.parsers')
017.881  000.044  000.044: require('nvim-treesitter.compat')
018.210  000.224  000.224: require('nvim-treesitter.ts_utils')
018.217  000.333  000.109: require('nvim-treesitter.tsrange')
018.272  000.053  000.053: require('nvim-treesitter.caching')
018.282  000.645  000.214: require('nvim-treesitter.query')
018.293  000.929  000.285: require('nvim-treesitter.configs')
018.297  001.137  000.208: require('nvim-treesitter.info')
018.469  000.170  000.170: require('nvim-treesitter.shell_command_selectors')
018.488  004.866  000.568: require('nvim-treesitter.install')
018.546  000.056  000.056: require('nvim-treesitter.statusline')
018.669  000.121  000.121: require('nvim-treesitter.query_predicates')
018.672  005.134  000.090: require('nvim-treesitter')
018.969  005.487  000.353: sourcing /home/hyperpc/.local/share/nvim/site/pack/packer/start/nvim-treesitter/plugin/nvim-treesitter.lua
019.179  000.033  000.033: sourcing /home/hyperpc/.local/share/nvim/site/pack/packer/start/plenary.nvim/plugin/plenary.vim
019.660  000.289  000.289: sourcing /home/hyperpc/.local/share/nvim/site/pack/packer/start/telescope.nvim/plugin/telescope.lua
019.794  001.021: loading packages
019.796  000.002: loading after plugins
019.810  000.014: inits 3
021.115  001.305: reading ShaDa
021.309  000.194: opening buffers
021.326  000.017: BufEnter autocommands
021.328  000.002: editing files in windows
021.398  000.069: VimEnter autocommands
021.400  000.003: UIEnter autocommands
021.401  000.001: before starting main loop
021.804  000.403: first screen update
021.807  000.002: --- NVIM STARTED ---


times in msec
 clock   self+sourced   self:  sourced script
 clock   elapsed:              other lines

000.008  000.008: --- NVIM STARTING ---
000.146  000.138: event init
000.213  000.068: early init
000.267  000.053: locale set
000.320  000.054: init first window
000.548  000.228: inits 1
000.559  000.011: window checked
000.562  000.002: parsing arguments
000.936  000.048  000.048: require('vim.shared')
001.026  000.034  000.034: require('vim._options')
001.028  000.089  000.055: require('vim._editor')
001.029  000.171  000.034: require('vim._init_packages')
001.030  000.297: init lua interpreter
001.446  000.416: expanding arguments
001.483  000.036: inits 2
001.748  000.266: init highlight


times in msec
 clock   self+sourced   self:  sourced script
 clock   elapsed:              other lines

000.007  000.007: --- NVIM STARTING ---
000.202  000.195: event init
000.267  000.065: early init
000.313  000.046: locale set
000.344  000.031: init first window
000.531  000.188: inits 1
000.548  000.017: window checked
000.550  000.002: parsing arguments
000.900  000.049  000.049: require('vim.shared')
000.987  000.032  000.032: require('vim._options')
000.989  000.086  000.054: require('vim._editor')
000.990  000.163  000.028: require('vim._init_packages')
000.991  000.277: init lua interpreter
001.045  000.054: expanding arguments
001.071  000.026: inits 2
001.363  000.292: init highlight
001.365  000.002: waiting for UI
001.539  000.174: done waiting for UI
001.551  000.012: clear screen
001.671  000.120: init default mappings & autocommands
002.219  000.046  000.046: sourcing /snap/nvim/2819/usr/share/nvim/runtime/ftplugin.vim
002.292  000.026  000.026: sourcing /snap/nvim/2819/usr/share/nvim/runtime/indent.vim
003.815  000.141  000.141: require('packer.util')
003.844  001.206  001.066: require('packer')
004.030  000.184  000.184: require('packer.log')
004.403  000.101  000.101: require('packer.async')
004.605  000.062  000.062: require('packer.result')
004.608  000.202  000.140: require('packer.jobs')
004.612  000.564  000.261: require('packer.plugin_utils')
004.765  000.144  000.144: require('packer.snapshot')
005.152  000.226  000.226: require('telescope.builtin')
005.169  000.015  000.015: require('vim.keymap')
005.205  002.867  000.529: sourcing /home/hyperpc/.config/nvim/init.lua
005.211  000.602: sourcing vimrc file(s)
005.545  000.191  000.191: sourcing /snap/nvim/2819/usr/share/nvim/runtime/filetype.lua
005.709  000.075  000.075: sourcing /snap/nvim/2819/usr/share/nvim/runtime/syntax/synload.vim
005.820  000.249  000.174: sourcing /snap/nvim/2819/usr/share/nvim/runtime/syntax/syntax.vim
006.550  000.134  000.134: sourcing /snap/nvim/2819/usr/share/nvim/runtime/plugin/gzip.vim
006.581  000.011  000.011: sourcing /snap/nvim/2819/usr/share/nvim/runtime/plugin/health.vim
007.064  000.161  000.161: sourcing /snap/nvim/2819/usr/share/nvim/runtime/pack/dist/opt/matchit/plugin/matchit.vim
007.159  000.563  000.402: sourcing /snap/nvim/2819/usr/share/nvim/runtime/plugin/matchit.vim
007.302  000.127  000.127: sourcing /snap/nvim/2819/usr/share/nvim/runtime/plugin/matchparen.vim
007.623  000.298  000.298: sourcing /snap/nvim/2819/usr/share/nvim/runtime/plugin/netrwPlugin.vim
007.795  000.009  000.009: sourcing /home/hyperpc/.local/share/nvim/rplugin.vim
007.802  000.147  000.138: sourcing /snap/nvim/2819/usr/share/nvim/runtime/plugin/rplugin.vim
007.915  000.081  000.081: sourcing /snap/nvim/2819/usr/share/nvim/runtime/plugin/shada.vim
007.981  000.030  000.030: sourcing /snap/nvim/2819/usr/share/nvim/runtime/plugin/spellfile.vim
008.106  000.103  000.103: sourcing /snap/nvim/2819/usr/share/nvim/runtime/plugin/tarPlugin.vim
008.263  000.128  000.128: sourcing /snap/nvim/2819/usr/share/nvim/runtime/plugin/tohtml.vim
008.301  000.016  000.016: sourcing /snap/nvim/2819/usr/share/nvim/runtime/plugin/tutor.vim
008.456  000.132  000.132: sourcing /snap/nvim/2819/usr/share/nvim/runtime/plugin/zipPlugin.vim
009.667  000.059  000.059: require('github-theme.lib.collect')
009.740  000.070  000.070: require('github-theme.util')
009.758  000.220  000.090: require('github-theme.config')
009.760  000.854  000.635: require('github-theme')
009.812  000.051  000.051: require('github-theme.override')
009.927  000.060  000.060: require('github-theme.lib.hash')
010.048  000.116  000.116: require('github-theme.util.deprecation')
010.122  000.071  000.071: require('github-theme.lib.deprecation')
011.438  000.099  000.099: require('github-theme.autocmds')
011.452  001.276  001.177: sourcing /home/hyperpc/.local/share/nvim/site/pack/packer/start/github-nvim-theme/colors/github_light.vim
011.470  002.907  000.478: sourcing /home/hyperpc/.config/nvim/plugin/packer_compiled.lua
011.761  000.047  000.047: sourcing /snap/nvim/2819/usr/share/nvim/runtime/plugin/editorconfig.lua
011.905  000.085  000.085: sourcing /snap/nvim/2819/usr/share/nvim/runtime/plugin/man.lua
011.993  000.062  000.062: sourcing /snap/nvim/2819/usr/share/nvim/runtime/plugin/nvim.lua
012.010  001.488: loading rtp plugins
012.270  000.042  000.042: sourcing /home/hyperpc/.local/share/nvim/site/pack/packer/start/github-nvim-theme/plugin/github_theme.vim
013.382  000.165  000.165: require('nvim-treesitter.utils')
015.430  000.237  000.237: require('vim.treesitter.language')
015.444  000.615  000.378: require('vim.treesitter.query')
015.568  000.121  000.121: require('vim.treesitter._range')
015.579  001.179  000.443: require('vim.treesitter.languagetree')
015.587  001.450  000.272: require('vim.treesitter')
017.335  003.949  002.498: require('nvim-treesitter.parsers')
018.384  000.054  000.054: require('nvim-treesitter.compat')
018.751  000.241  000.241: require('nvim-treesitter.ts_utils')
018.757  000.368  000.127: require('nvim-treesitter.tsrange')
018.818  000.059  000.059: require('nvim-treesitter.caching')
018.827  000.742  000.261: require('nvim-treesitter.query')
018.838  001.079  000.337: require('nvim-treesitter.configs')
018.841  001.494  000.415: require('nvim-treesitter.info')
019.019  000.177  000.177: require('nvim-treesitter.shell_command_selectors')
019.048  006.388  000.603: require('nvim-treesitter.install')
019.112  000.062  000.062: require('nvim-treesitter.statusline')
019.244  000.130  000.130: require('nvim-treesitter.query_predicates')
019.248  006.696  000.116: require('nvim-treesitter')
019.578  007.102  000.407: sourcing /home/hyperpc/.local/share/nvim/site/pack/packer/start/nvim-treesitter/plugin/nvim-treesitter.lua
019.749  000.034  000.034: sourcing /home/hyperpc/.local/share/nvim/site/pack/packer/start/plenary.nvim/plugin/plenary.vim
020.123  000.240  000.240: sourcing /home/hyperpc/.local/share/nvim/site/pack/packer/start/telescope.nvim/plugin/telescope.lua
020.287  000.858: loading packages
020.290  000.003: loading after plugins
020.315  000.025: inits 3
021.642  001.326: reading ShaDa
021.857  000.215: opening buffers
021.876  000.019: BufEnter autocommands
021.879  000.003: editing files in windows
021.955  000.076: VimEnter autocommands
021.958  000.003: UIEnter autocommands
021.959  000.001: before starting main loop
022.411  000.451: first screen update
022.413  000.002: --- NVIM STARTED ---


times in msec
 clock   self+sourced   self:  sourced script
 clock   elapsed:              other lines

000.008  000.008: --- NVIM STARTING ---
000.154  000.146: event init
000.226  000.072: early init
000.271  000.045: locale set
000.322  000.051: init first window
000.562  000.240: inits 1
000.570  000.007: window checked
000.572  000.002: parsing arguments
000.961  000.056  000.056: require('vim.shared')
001.048  000.032  000.032: require('vim._options')
001.050  000.086  000.054: require('vim._editor')
001.051  000.179  000.037: require('vim._init_packages')
001.053  000.302: init lua interpreter
001.415  000.363: expanding arguments
001.450  000.035: inits 2
001.708  000.258: init highlight
