# Mac 环境搭建

## Result成果教材

参考使用链接：
[https://medium.com/statementdog-engineering/prettify-your-zsh-command-line-prompt-3ca2acc967f](https://medium.com/statementdog-engineering/prettify-your-zsh-command-line-prompt-3ca2acc967f)

步骤：
1. 安装homebrew 
2. 安装iterm2
3. 安装color theme,powerline font
4. 安装zsh
5. 安装on-my-zsh
6. 安装zsh themes:powerlevel9k
7. 配置powerlevel9k

参考链接存在的问题：
- brew cask search nerd需要修改为brew search nerd
- brew tap caskroom/fonts修改为brew tap homebrew/cask-fonts
- 修改font-sourcecodepro-font为 brew cask install font-saucecodepro-nerd-font


资源网址：
* [https://raw.githubusercontent.com/Homebrew/install/master/install.sh](https://raw.githubusercontent.com/Homebrew/install/master/install.sh)
* [https://raw.githubusercontent.com/robbyrussell/oh-my-zsh/master/tools/install.sh](https://raw.githubusercontent.com/robbyrussell/oh-my-zsh/master/tools/install.sh)
* [https://github.com/mbadolato/iTerm2-Color-Schemes](https://github.com/mbadolato/iTerm2-Color-Schemes)
* [https://github.com/ohmyzsh/ohmyzsh](https://github.com/ohmyzsh/ohmyzsh)
* [https://github.com/Powerlevel9k/powerlevel9k#available-prompt-segments](https://github.com/Powerlevel9k/powerlevel9k#available-prompt-segments)

其他辅助教程网址：
* [https://brew.sh/](https://brew.sh/)
* [https://www.spreered.com/bootstrap_iterm_zsh/](https://www.spreered.com/bootstrap_iterm_zsh/)
* [https://medium.com/@manisht/iterm2-zsh-oh-my-zsh-on-mac-b64fc435e5d](https://medium.com/@manisht/iterm2-zsh-oh-my-zsh-on-mac-b64fc435e5d)
* [https://medium.com/swlh/power-up-your-terminal-using-oh-my-zsh-iterm2-c5a03f73a9fb](https://medium.com/swlh/power-up-your-terminal-using-oh-my-zsh-iterm2-c5a03f73a9fb)

### 安装配置
1. 使用ruby方式安装软件
```/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"```
下载远程脚本
* [https://raw.githubusercontent.com/Homebrew/install/master/install.sh](https://raw.githubusercontent.com/Homebrew/install/master/install)
homebrew_install.sh
sh homebrew_install.sh
2. 使用/bin/bash安装brew
```
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)"
```
3. 安装iterm2+zsh+on-my-zsh
```sh
brew cask install iterm2
brew install zsh
sh -c "$(curl -fsSL https://raw.github.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"
chsh -s /bin/zsh
```
安装on-my-zsh的时候可以先下载然后再使用shell进行执行
4. 配置iterm2 preferences
修改.zshrc文件
修改 ZSH_THEME="linuxonly"进行测试
source ~/.zshrc
后面再进行.zshrc文件的修改只需要执行exec $SHELL即可

5. 配置on-my-zsh+powerlevel9k
```sh
git clone https://github.com/bhilburn/powerlevel9k.git ~/.oh-my-zsh/custom/themes/powerlevel9k
```
修改配置文件.zshrc
```sh
#左侧
POWERLEVEL9K_LEFT_PROMPT_ELEMENTS=(context dir dir_writable vcs vi_mode)
#右侧
POWERLEVEL9K_RIGHT_PROMPT_ELEMENTS=(status background_jobs history ram load time)
#若当前登入的帐号为你的帐号xxx，就不用特别显示出来
DEFAULT_USER="xxx"
#使用nerd font时可以显示更多icon。详情请参考powerlevel9k wiki 
POWERLEVEL9K_MODE='nerdfont-complete'
```
6. 设置字体配置
```
brew tap homebrew/cask-fonts
brew cask install font-saucecodepro-nerd-font
```
7. 设置颜色配置
在color theme 里面寻找需要的资源在preferences->profiles->color中进行import


## 安装代码软件

## vpn
[https://github.com/2dust/v2rayNG/releases](https://github.com/2dust/v2rayNG/releases)
## mail邮箱
* [163.com](#)
* [qq.com](#) 需要在网页qq邮箱上进行认证
* [gmail.com](#) 需要进行邮件绑定邮件认证

### 开发环境
vscode
[https://code.visualstudio.com/docs/?dv=osx](https://code.visualstudio.com/docs/?dv=osx)
xterm2
homebrew

## 其他
```
unzip source -d targets
```

```
tar -zxvf source -C target
```