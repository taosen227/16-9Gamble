export interface FontEndData {
    battleName:string,
    playerInfos:PlayerInfo[]
}

export interface PlayerInfo{
    playerName:string,
    sessions:Session[]
}

export interface Session{
    session:number,
    money:number
}

export interface FontEndMoneyData{
    battleName:string,
    moneyInfos:MoneyInfo[]
}

export interface MoneyInfo{
    playerName:string,
    totalMoney:number
}