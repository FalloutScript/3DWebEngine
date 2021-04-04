import { TestLevel } from "./TestLevel.js";
import { TestGame } from "./TestGame.js";

var level = new TestLevel();
var engine = new TestGame(level);

window.onload = function()
{
    engine.load();
    engine.run();
}