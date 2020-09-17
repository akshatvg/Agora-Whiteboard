# lastMinutePPT

[![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/akshatvg/lastMinutePPT?logo=github&style=social)](https://github.com/akshatvg/) [![GitHub last commit](https://img.shields.io/github/last-commit/akshatvg/lastMinutePPT?style=social&logo=git)](https://github.com/akshatvg/) [![GitHub stars](https://img.shields.io/github/stars/akshatvg/lastMinutePPT?style=social)](https://github.com/akshatvg/lastMinutePPT/stargazers) [![GitHub forks](https://img.shields.io/github/forks/akshatvg/lastMinutePPT?style=social&logo=git)](https://github.com/akshatvg/lastMinutePPT/network)

Project which automatically generates crucial presentation slides based on what you say in real time.

<p align="center">
<a href="https://lmppt.akshatvg.com/">
<img src="https://github.com/akshatvg/lastMinutePPT/blob/master/Assets/app-icon-64%402x.png" width="120px" height="120px" alt="lastMinutePPT Logo"/>
</a>
</p>

![Generic badge](https://img.shields.io/badge/Last_Minute-PPTs-orange) 

#### Link for [demo](https://lmppt.akshatvg.com/) 
[![Generic badge](https://img.shields.io/badge/view-demo-orange)](https://lmppt.akshatvg.com/)


## Requirements

[![GitHub top language](https://img.shields.io/github/languages/top/akshatvg/lastMinutePPT?logo=javascript&style=social)](https://github.com/akshatvg/)

The source code of this project is written in **`HTML/CSS/JS`**. So, you do not require anything extra to run this project.

## Instructions
This project requires two processes to run.

First, `git clone` our repository.

Then, create the virtualenv:
```bash
python3 -m pip install virtualenv
mkvirtualenv hack --python 3.6
source ~/hack/bin/activate
pip install -r ~/lastMinutePPT/reqs.txt
```
*NOTE: we may be missing some requirements. This is most likely not up to date.*

Then, open up tmux and run two sessions:

tmux pane 1:
```bash
cd ~/lastMinutePPT/data
source ~/hack/bin/activate
python3 server.py (requires restart on changes made to main_function.py)
```

tmux pane 2:
```bash
cd ~/lastMinutePPT/
source ~/hack/bin/activate
python3 manage.py runserver (does not require restart)
```

```bash



 _____ _                 _     __   __            
|_   _| |               | |    \ \ / /            
  | | | |__   __ _ _ __ | | __  \ V /___  _   _   
  | | | '_ \ / _` | '_ \| |/ /   \ // _ \| | | |  
  | | | | | | (_| | | | |   <    | | (_) | |_| |  
  \_/ |_| |_|\__,_|_| |_|_|\_\   \_/\___/ \__,_|  
                                                  
                                                  
______                                            
|  ___|                                           
| |_ ___  _ __                                    
|  _/ _ \| '__|                                   
| || (_) | |                                      
\_| \___/|_|                                      
                                                  
                                                  
______      _               _   _               _ 
| ___ \    (_)             | | | |             | |
| |_/ / ___ _ _ __   __ _  | |_| | ___ _ __ ___| |
| ___ \/ _ \ | '_ \ / _` | |  _  |/ _ \ '__/ _ \ |
| |_/ /  __/ | | | | (_| | | | | |  __/ | |  __/_|
\____/ \___|_|_| |_|\__, | \_| |_/\___|_|  \___(_)
                     __/ |                        
                    |___/                         

 


```

## License

**MIT &copy; [Akshat Gupta](https://github.com/akshatvg/lastMinutePPT/blob/master/LICENSE)**

[![GitHub license](https://img.shields.io/github/license/akshatvg/lastMinutePPT?style=social&logo=github)](https://github.com/akshatvg/lastMinutePPT/blob/master/LICENSE)

---------

```javascript

if (youEnjoyed) {
    starThisRepository();
}

```

-----------

