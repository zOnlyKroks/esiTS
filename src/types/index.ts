// ESI API Response Types
export interface ESIResponse<T = any> {
  headers: Record<string, string>
  data: T
}

// Request Configuration
export interface RequestConfig {
  subUrl: string
  body?: any
  query?: Record<string, string | number | boolean | number[] | undefined>
  requestType?: 'GET' | 'POST' | 'PUT' | 'DELETE'
  needsAuth?: boolean
}

// Input Validation Configuration
export interface ValidationConfig {
  input: any
  type: 'string' | 'number' | 'object' | 'boolean'
  message: string
  options?: any[]
  optional?: boolean
}

// ESI Settings Configuration
export interface ESISettings {
  projectName: string
  link: string
  authToken: string
  language: string
}

// Cache Entry Structure
export interface CacheEntry {
  etag: string
  data: ESIResponse
  timestamp: number
}

// Cache Statistics
export interface CacheStats {
  size: number
  keys: string[]
  entries: Array<{
    key: string
    etag: string
    timestamp: number
    age: number
  }>
}

// Constructor Options
export interface ESIJSOptions {
  logging?: boolean
  token?: string
}

// Custom Error with ESI-specific properties
export interface ESIError extends Error {
  code?: string
  url?: string
}

// Utility Functions
export interface UtilityFunctions {
  getSettings(): ESISettings
  setSettings(options: {
    route?: string
    authToken?: string
    language?: string
    projectName?: string
  }): boolean
  sleep(millis: number): Promise<void>
  clearEtagCache(cacheKey?: string): void
  getCacheStats(): CacheStats
}

// ESI Client Type Definitions for each module
export interface AllianceModule {
  alliances(): Promise<ESIResponse>
  corps(allianceID: number): Promise<ESIResponse>
  icon(allianceID: number): Promise<ESIResponse>
  info(allianceID: number): Promise<ESIResponse>
  contacts: {
    contacts(allianceID: number): Promise<ESIResponse>
    labels(allianceID: number): Promise<ESIResponse>
  }
}

export interface CharacterModule {
  affiliation(characterIdArray: number[]): Promise<ESIResponse>
  corpHistory(characterID: number): Promise<ESIResponse>
  portrait(characterID: number): Promise<ESIResponse>
  info(characterID: number): Promise<ESIResponse>
  agentsResearch(characterID: number): Promise<ESIResponse>
  blueprints(characterID: number): Promise<ESIResponse>
  cspa(characterID: number, characters?: number[]): Promise<ESIResponse>
  fatigue(characterID: number): Promise<ESIResponse>
  medals(characterID: number): Promise<ESIResponse>
  roles(characterID: number): Promise<ESIResponse>
  standings(characterID: number): Promise<ESIResponse>
  stats(characterID: number): Promise<ESIResponse>
  titles(characterID: number): Promise<ESIResponse>
  assets: {
    assets(characterID: number): Promise<ESIResponse>
    locations(characterID: number, itemIDs?: number[]): Promise<ESIResponse>
    names(characterID: number, itemIDs: number[]): Promise<ESIResponse>
  }
  bookmarks: {
    bookmarks(characterID: number): Promise<ESIResponse>
    folders(characterID: number): Promise<ESIResponse>
  }
  calendar: {
    calendar(characterID: number, fromEvent?: number): Promise<ESIResponse>
    getEvent(characterID: number, eventID: number): Promise<ESIResponse>
    respond(characterID: number, eventID: number): Promise<ESIResponse>
    getAttendees(characterID: number, eventID: number): Promise<ESIResponse>
  }
  clones: {
    clones(characterID: number): Promise<ESIResponse>
    implants(characterID: number): Promise<ESIResponse>
  }
  contacts: {
    contacts(characterID: number): Promise<ESIResponse>
    addContacts(characterID: number, contacts: number[]): Promise<ESIResponse>
    deleteContacts(characterID: number, contacts: number[]): Promise<ESIResponse>
    editContacts(characterID: number, contacts: number[]): Promise<ESIResponse>
  }
  contracts: {
    contracts(characterID: number): Promise<ESIResponse>
    bids(characterID: number, contractID: number): Promise<ESIResponse>
    items(characterID: number, contractID: number): Promise<ESIResponse>
  }
  industry: {
    jobs(characterID: number): Promise<ESIResponse>
    ledger(characterID: number, page?: number): Promise<ESIResponse>
  }
}

export interface StatusModule {
  status(): Promise<ESIResponse>
}

export interface RouteModule {
  planRoute(origin: number, destination: number, flag?: 'shortest' | 'secure' | 'insecure', avoid?: number[]): Promise<ESIResponse>
}

export interface DogmaModule {
  attrInfo(attribute: number): Promise<ESIResponse>
  attrs(): Promise<ESIResponse>
  dynamicItemInfo(itemID: number, typeID: number): Promise<ESIResponse>
  effectInfo(effect: number): Promise<ESIResponse>
  effects(): Promise<ESIResponse>
}

export interface InsuranceModule {
  prices(): Promise<ESIResponse>
}

export interface IncursionsModule {
  incursions(): Promise<ESIResponse>
}

export interface SovereigntyModule {
  campaigns(): Promise<ESIResponse>
  map(): Promise<ESIResponse>
  structures(): Promise<ESIResponse>
}

export interface ContractsModule {
  public: {
    bids(contractID: number, pageNumber?: number): Promise<ESIResponse>
    contracts(regionID: number, pageNumber?: number): Promise<ESIResponse>
    items(contractID: number, pageNumber?: number): Promise<ESIResponse>
  }
}

export interface FactionWarfareModule {
  leaderboards: {
    characters(): Promise<ESIResponse>
    corps(): Promise<ESIResponse>
    leaderboard(): Promise<ESIResponse>
  }
  stats: {
    stats(): Promise<ESIResponse>
    characterStats(characterID: number): Promise<ESIResponse>
    corporationStats(corporationID: number): Promise<ESIResponse>
  }
  systems(): Promise<ESIResponse>
  wars(): Promise<ESIResponse>
}

export interface OpportunitiesModule {
  groupInfo(groupID: number): Promise<ESIResponse>
  groups(): Promise<ESIResponse>
  taskInfo(taskID: number): Promise<ESIResponse>
  tasks(): Promise<ESIResponse>
}

export interface KillmailsModule {
  killmailInfo(killID: number, killHash: string): Promise<ESIResponse>
}

export interface UserinterfaceModule {
  autopilot: {
    waypoint(destinationID: number, addToBeginning?: boolean, clearOtherWaypoints?: boolean): Promise<ESIResponse>
  }
  openWindow: {
    contract(contractID: number): Promise<ESIResponse>
    information(targetID: number): Promise<ESIResponse>
    marketDetails(itemID: number): Promise<ESIResponse>
    newMail(mail: any): Promise<ESIResponse>
  }
}

export interface WalletModule {
  character: {
    balance(characterID: number): Promise<ESIResponse>
    journal(characterID: number, page?: number): Promise<ESIResponse>
    transactions(characterID: number, fromID?: number): Promise<ESIResponse>
  }
  corporation: {
    wallets(corporationID: number): Promise<ESIResponse>
    journal(corporationID: number, division: number, page?: number): Promise<ESIResponse>
    transactions(corporationID: number, division: number, fromID?: number): Promise<ESIResponse>
  }
}

export interface SkillsModule {
  skills(characterID: number): Promise<ESIResponse>
  queue(characterID: number): Promise<ESIResponse>
  attributes(characterID: number): Promise<ESIResponse>
}

export interface MailModule {
  headers(characterID: number, labels?: number[], lastMailID?: number): Promise<ESIResponse>
  send(characterID: number, mail: any): Promise<ESIResponse>
  deleteMail(characterID: number, mailID: number): Promise<ESIResponse>
  mail(characterID: number, mailID: number): Promise<ESIResponse>
  updateMetadata(characterID: number, mailID: number, metadata: any): Promise<ESIResponse>
  labels: {
    labels(characterID: number): Promise<ESIResponse>
    createLabel(characterID: number, label: any): Promise<ESIResponse>
    deleteLabel(characterID: number, labelID: number): Promise<ESIResponse>
  }
  lists: {
    lists(characterID: number): Promise<ESIResponse>
  }
}

export interface LocationModule {
  location(characterID: number): Promise<ESIResponse>
  ship(characterID: number): Promise<ESIResponse>
  online(characterID: number): Promise<ESIResponse>
}

export interface WarsModule {
  warInfo(warID: number): Promise<ESIResponse>
  warKills(warID: number): Promise<ESIResponse>
  wars(maxWarID?: number): Promise<ESIResponse>
}

export interface LoyaltyModule {
  offers(corporationID: number): Promise<ESIResponse>
}

export interface IndustryModule {
  facilities(): Promise<ESIResponse>
  systems(): Promise<ESIResponse>
}

export interface MarketModule {
  groups: {
    groupInfo(groupID: number): Promise<ESIResponse>
    groups(): Promise<ESIResponse>
  }
  history(regionID: number, typeID: number): Promise<ESIResponse>
  orders(regionID: number, typeID?: number, orderType?: 'all' | 'sell' | 'buy', pageNumber?: number): Promise<ESIResponse>
  prices(): Promise<ESIResponse>
  types(regionID: number, pageNumber?: number): Promise<ESIResponse>
}

export interface PlanetaryInteractionModule {
  schematicInfo(schematicID: number): Promise<ESIResponse>
}

export interface UniverseModule {
  ancestries: {
    ancestries(): Promise<ESIResponse>
  }
  belts: {
    beltInfo(beltID: number): Promise<ESIResponse>
  }
  bloodlines: {
    bloodlines(): Promise<ESIResponse>
  }
  bulk: {
    idsToNames(IDs: number[]): Promise<ESIResponse>
    namesToIDs(names: string[]): Promise<ESIResponse>
  }
  categories: {
    categories(): Promise<ESIResponse>
    categoryInfo(categoryID: number): Promise<ESIResponse>
  }
  constellations: {
    constellationInfo(constellationID: number): Promise<ESIResponse>
    constellations(): Promise<ESIResponse>
  }
  factions: {
    factions(): Promise<ESIResponse>
  }
  graphics: {
    graphicInfo(graphicID: number): Promise<ESIResponse>
    graphics(): Promise<ESIResponse>
  }
  groups: {
    groupInfo(groupID: number): Promise<ESIResponse>
    groups(): Promise<ESIResponse>
  }
  moons: {
    moonInfo(moonID: number): Promise<ESIResponse>
  }
  planets: {
    planetInfo(planetID: number): Promise<ESIResponse>
  }
  races: {
    races(): Promise<ESIResponse>
  }
  regions: {
    regionInfo(regionID: number): Promise<ESIResponse>
    regions(): Promise<ESIResponse>
  }
  stargates: {
    stargateInfo(stargateID: number): Promise<ESIResponse>
  }
  stars: {
    starInfo(starID: number): Promise<ESIResponse>
  }
  stations: {
    stationInfo(stationID: number): Promise<ESIResponse>
  }
  structures: {
    structures(): Promise<ESIResponse>
    structureInfo(structureID: number): Promise<ESIResponse>
  }
  systems: {
    systemInfo(systemID: number): Promise<ESIResponse>
    systemJumps(): Promise<ESIResponse>
    systemKills(): Promise<ESIResponse>
    systems(): Promise<ESIResponse>
  }
  types: {
    typeInfo(typeID: number): Promise<ESIResponse>
    types(): Promise<ESIResponse>
  }
}

export interface CorporationModule {
  corporationHistory(corporationID: number): Promise<ESIResponse>
  icons(corporationID: number): Promise<ESIResponse>
  info(corporationID: number): Promise<ESIResponse>
  npcCorps(): Promise<ESIResponse>
  blueprints(corporationID: number, page?: number): Promise<ESIResponse>
  secureContainerLogs(corporationID: number, page?: number): Promise<ESIResponse>
  divisions(corporationID: number): Promise<ESIResponse>
  facilities(corporationID: number): Promise<ESIResponse>
  medals: {
    medals(corporationID: number): Promise<ESIResponse>
    medalInfo(corporationID: number, medalID: number): Promise<ESIResponse>
  }
  members: {
    members(corporationID: number): Promise<ESIResponse>
    limit(corporationID: number): Promise<ESIResponse>
    titles(corporationID: number): Promise<ESIResponse>
    tracking(corporationID: number): Promise<ESIResponse>
  }
  roles: {
    roles(corporationID: number): Promise<ESIResponse>
    history(corporationID: number, page?: number): Promise<ESIResponse>
  }
}

// Main ESI Client Interface
export interface ESIClient {
  alliance: AllianceModule
  character: CharacterModule
  contracts: ContractsModule
  corporation: CorporationModule
  dogma: DogmaModule
  fw: FactionWarfareModule
  incursions: IncursionsModule
  industry: IndustryModule
  insurance: InsuranceModule
  killmails: KillmailsModule
  location: LocationModule
  loyalty: LoyaltyModule
  mail: MailModule
  market: MarketModule
  opportunities: OpportunitiesModule
  pi: PlanetaryInteractionModule
  routes: RouteModule
  skills: SkillsModule
  sov: SovereigntyModule
  status: StatusModule
  universe: UniverseModule
  ui: UserinterfaceModule
  util: UtilityFunctions
  wallet: WalletModule
  wars: WarsModule
}