# RealScout Client Portal UX Reverse Engineering

Date: 2026-05-04
Source: live walkthrough of `https://scottkato59.realscout.com`

## Product Shape

RealScout is a client-facing home search portal with agent branding.
Primary job:
- browse listings
- mark interest state
- compare listings
- message the agent
- manage saved searches and alerts

## Global IA

Persistent left nav:
- Search
- My Matches
- Interested
- Messages
- My Home Value
- My Searches
- More
- Settings
- Logout

Persistent top search:
- city / county / zip / neighborhood / address / school search
- used across pages

Branding:
- agent avatar, name, brokerage, phone, email, license number
- strong agent identity, not generic SaaS chrome

## Entry And Auth

Observed login gate:
- portal choice: Agent Portal or Client Portal
- email-first sign in for client portal
- password fallback available via `Use password instead`
- support link routed to agent email

UX note:
- the product treats the account as agent-led client access
- the user is oriented around a specific agent contact before browsing

## Search Flow

URL:
- `/homesearch/map`

Layout:
- left nav
- top search field
- left content list
- right interactive map

List behavior:
- property cards show photo, status, price, beds, baths, sqft, address
- card CTAs are `Interested` and `Not Interested`
- map pins mirror listing prices
- `More Filters` and min/max price sit above the list
- sort defaults to `Newest On Site`
- `Save Search` appears near the top of the map area

Card state model:
- `For Sale`
- `Upcoming Open House`
- `New on site`
- interest state shown as green when selected

## Listing Detail Flow

Open card -> modal detail page.
Observed route:
- `/homesearch/listings/...`

Modal structure:
- prev listing / next listing navigation
- large photo hero with photo grid
- `See all 36 photos`
- `Compare`
- `Print`
- price, status badge, and address
- core facts row: beds, baths, sqft, lot size
- `Interested` / `Not Interested`
- agent contact and message module

Detail content sections:
- Overview
- property subtype
- price per square foot
- living area
- bedrooms / baths
- MLS / attribution / source
- property info
- building info
- room info
- lot / taxes / utilities
- neighborhood
- schools
- listing history

Behavioral note:
- the page mixes MLS disclosure content with action-oriented client prompts
- agent conversation is embedded below property data, not separated into another surface

## Agent Conversation Module

Observed prompt:
- `Tell Scott Kato what you think`
- `Quick Message to Scott`
- `Request Showing`
- free-text message box
- quick timeline chips:
  - less than 3 months
  - 3-6 months
  - 6-12 months
  - 1+ year
  - no plans to buy
- preference chips for likes / dislikes

UX note:
- the product is collecting buyer intent, not just sending chat
- messaging is structured as guided intake

## My Matches Flow

URL:
- `/homesearch/matches`

Observed state:
- `My Matches (2893)`
- showing `100 of 2893 listings`
- sort labeled `Recent Status/Price Changes`

Interpretation:
- this is a watchlist of listings that match the client profile
- the product surfaces change awareness, not just static saved results

## Interested Flow

URL:
- `/homesearch/interested`

Observed state:
- `Showing 5 of 5 listings`
- sort `Most Recent`
- interest cards are green-styled

Interpretation:
- this is a curated shortlist of user-likes
- it functions as a lightweight favorites queue

## Messages Flow

URL:
- `/homesearch/conversations`

Observed state:
- mostly empty conversation canvas
- compose box
- attachment listing control
- send button disabled until input exists

Interpretation:
- messaging is centered on the agent relationship
- it is likely tied to listings when attached

## Home Value Flow

URL:
- `/homesearch/home-reports`

Primary CTA:
- enter home address
- `View Home Value`

Support content:
- value estimate explainer
- FAQ accordion
- agent profile card

Interpretation:
- this is a lead capture and valuation entry point
- it blends self-serve estimate with agent follow-up

## My Searches And More

My Searches:
- expands to a saved search link
- suggests one primary active search in this account

More menu:
- Not Interested
- Recently Viewed
- My Profile

Interpretation:
- `More` is a utility overflow for secondary collections and account history

## Settings

URL:
- `/profile/settings?`

Observed controls:
- back to full experience
- listing alerts
- saved search link and edit link
- frequency selector
- email alert toggles
- reset password
- opt out / disable account

Behavior:
- `Show Disabled Alerts?` appears locked off in this account state
- email preferences are the main settings surface

## UX Patterns To Reuse

- persistent agent branding everywhere
- map-plus-card browsing for listings
- strong interest state feedback
- MLS data and client messaging on one screen
- saved search as a top-level entity
- alerts and preferences exposed in settings
- guided message prompts to capture buying intent

## Open Questions

- exact rules behind `My Matches` generation
- whether `Interested` updates a shared CRM or only client state
- how many saved searches a client can have
- whether map pins filter dynamically as the list scrolls

## Key Takeaway

The product is not a generic search site.
It is a branded agent-managed buyer journey:
- discover listings
- express intent
- compare options
- message the agent
- keep alerts active
