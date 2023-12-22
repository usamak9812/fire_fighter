airport-crisis-training
=======================

Application for training firemen at airports in handling crisis situations


DEV NOTES:
Not the original author of this code.
Original author kept it unversioned.
Started versioning in Github, so this is based on the "latest" copy.

I have been able to run this Software following the steps below:
1. Download an old version of Chromium-browser, like: https://commondatastorage.googleapis.com/chromium-browser-snapshots/index.html?prefix=Win/292826/
(Link was updated from version 52 to version 39, this is an older version that may be run this old code more reliably).
2. Extract content (stand alone, no need to install).
3. Run (chrome.exe)
4. Open extensions (chrome://extensions/)
5. Load unpacked extension (point to the ./src folder)
6. Launch
These steps should get the Software to run locally.

To build the executable:
Inno Setup was used to build the .exe
https://jrsoftware.org/isinfo.php
There is a copy of the "latest" configuration used to build the software in the folder: ./AIB_installer_builder
The configuration "installer-project-full" is the one to run for a production .exe version.
The last time this was run succesfully was back in October 2021.
Some exploration of the tool may need to be done to get it to compile succesfully (see the site https://jrsoftware.org/isinfo.php).



