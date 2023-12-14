package src

import (
	"embed"
	"math/rand"
	"os"
	"strconv"
	"time"

	webview "github.com/webview/webview_go"
)

var (
	LocalAppData = os.Getenv("localappdata")
	RoamingAppData = os.Getenv("appdata")
	//go:embed www
	www embed.FS
	//go:embed data
	data embed.FS

	port = randInt(1111, 9999)
)

func randInt(min int, max int) int {
    rand.Seed(time.Now().UTC().UnixNano())
    return min + rand.Intn(max-min)
}

func Run() {
	
	w := webview.New(true)
	defer w.Destroy()
	w.SetTitle("Project Shadow Carnival")
	w.SetSize(800, 600, webview.HintNone)
	w.Navigate("http://localhost:"+strconv.Itoa(port))
	bindFunctions(w)
	go serverEmbed(www, "localhost", strconv.Itoa(port))
	w.Run()
}