setlocal wildignore+=dist
setlocal foldlevelstart=2
let g:used_javascript_libs = 'angularjs'
let $PATH = './node_modules/.bin:' . $PATH
let g:syntastic_javascript_checkers = ['eslint']
autocmd BufNewFile,BufEnter .eslintrc setlocal filetype=yaml
