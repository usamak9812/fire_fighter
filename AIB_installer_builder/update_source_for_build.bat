set dst=%~dp0\data\UserData\Default\Extensions\jjkenibnhjhjbjegmmbioncdiojhccbl
rd %dst%\*
tar -xvf %1 -C %dst%
rename %dst%\arff-interactive-board-master 1.0.10_0
pause