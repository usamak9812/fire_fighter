#include <windows.h>

int WINAPI WinMain(HINSTANCE hInstance, HINSTANCE hPrevInstance, LPSTR lpCmdLine, int nCmdShow){
  char appPath[] = ".\\Application\\chrome.exe";
  char appFlags[] = "chrome.exe --user-data-dir=..\\UserData --no-default-browser-check --app-id=jjkenibnhjhjbjegmmbioncdiojhccbl";
  PROCESS_INFORMATION pif;  //Gives info on the thread and..
                           //..process for the new process
  STARTUPINFO si;          //Defines how to start the program

  ZeroMemory(&si,sizeof(si)); //Zero the STARTUPINFO struct
  si.cb = sizeof(si);         //Must set size of structure

  BOOL bRet = CreateProcess(appPath,
                            appFlags,
                            NULL,
                            NULL,
                            FALSE,
                            0,
                            NULL,
                            NULL,
                            &si,
                            &pif);

  CloseHandle(pif.hProcess);   //Close handle to process
  CloseHandle(pif.hThread);    //Close handle to thread

  return 0;
}