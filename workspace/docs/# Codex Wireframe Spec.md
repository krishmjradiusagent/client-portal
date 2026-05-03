# Codex Wireframe Spec
## RealScout-Style Property Search
## Click Flows + Dropdown Values
---
## 0. Goal
Build a desktop web property-search UI from screenshots.
Primary layout:
- Left dark sidebar
- Center results column
- Right map panel
- Modal overlays
- Dropdown-driven filters
- Property card actions
---
# 1. Global Navigation
## Sidebar Items
```yaml
profile_block:
  avatar: true
  name: Scott Kato
  company: Kato Group
  phone: (562) 512-5806
nav_items:
  - Search
  - My Matches
  - Interested
  - Messages
  - My Home Value
  - My Searches
  - More
  - Settings
  - Logout
expandable_items:
  My Searches:
    collapsed: true
    expanded_values:
      - My Home Search
  More:
    collapsed: false
    expanded_values:
      - Not Interested
      - Recently Viewed
      - My Profile

Sidebar Click Flows

click_search:
  route: /search
  result:
    page_title: Search
    shows_filters: true
    shows_save_search_button: true
    shows_map: true
click_my_matches:
  route: /matches
  result:
    page_title: My Matches (2864)
    result_count: Showing 100 of 2864 listings
    sort_dropdown_visible: true
click_interested:
  route: /interested
  result:
    page_title: Interested Homes
    card_state: interested
click_my_searches:
  action: toggle_expand
  expanded_values:
    - My Home Search
click_my_home_search:
  route: /searches/my-home-search
  result:
    page_title: My Home Search
    edit_search_button: visible
    map_boundary: visible
    toast: Searching in Custom
click_more:
  action: toggle_expand
  expanded_values:
    - Not Interested
    - Recently Viewed
    - My Profile
click_not_interested:
  route: /not-interested
  result:
    page_title: Not Interested Homes
    card_state: dismissed
click_recently_viewed:
  route: /recently-viewed
  result:
    page_title: Recently Viewed
click_my_profile:
  route: /profile
  result:
    page_title: My Profile
click_settings:
  route: /settings
  result:
    page_title: Account & Email Settings
click_logout:
  action: open_confirm_dialog

⸻

2. Search Header

Search Input

component: SearchCombobox
placeholder: City, County, Zip, Neighborhood, Address, School
icon_left: Search
icon_right: ChevronDown

Search Input Click Flow

click_search_input:
  opens: location_dropdown
location_dropdown_values:
  sections:
    - Recent Searches
    - Suggested Locations
    - Cities
    - Neighborhoods
    - Schools
    - Addresses
example_values:
  recent:
    - Los Angeles, CA
    - Glendale, CA
    - Pasadena, CA
  city:
    - Los Angeles
    - Glendale
    - Pasadena
    - Burbank
    - Santa Monica
  neighborhood:
    - Hollywood
    - Highland Park
    - Los Feliz
    - Echo Park
  school:
    - UCLA
    - USC
  address:
    - 2303 W 75th Street, Los Angeles

Selecting Location

select_location:
  updates:
    - search_input_value
    - map_center
    - listing_results
  closes_dropdown: true

⸻

3. Search Page Filters

Visible Controls

filters:
  - Price Min
  - Price Max
  - More Filters
  - Save Search
  - Sort Dropdown

⸻

Price Min Dropdown

component: Select
label: Price Min
placeholder: Price Min
values:
  - No Min
  - $100K
  - $200K
  - $300K
  - $400K
  - $500K
  - $600K
  - $700K
  - $800K
  - $900K
  - $1M
  - $1.25M
  - $1.5M
  - $2M
  - $3M
  - $5M

Price Min Flow

click_price_min:
  opens: dropdown
select_price_min:
  updates:
    - min_price_filter
    - result_count
    - map_markers
  closes_dropdown: true

⸻

Price Max Dropdown

component: Select
label: Price Max
placeholder: Price Max
values:
  - No Max
  - $300K
  - $400K
  - $500K
  - $600K
  - $700K
  - $800K
  - $900K
  - $1M
  - $1.25M
  - $1.5M
  - $2M
  - $3M
  - $5M
  - $10M+

Price Max Flow

click_price_max:
  opens: dropdown
select_price_max:
  validation:
    if max_price < min_price:
      show_error: Max price must be higher than min price
  updates:
    - max_price_filter
    - result_count
    - map_markers

⸻

4. More Filters Drawer / Modal

Trigger

click_more_filters:
  opens: filter_modal
  modal_type: centered_dialog_or_side_sheet

Filter Values

more_filters:
  bedrooms:
    label: Beds
    values:
      - Any
      - Studio
      - 1+
      - 2+
      - 3+
      - 4+
      - 5+
  bathrooms:
    label: Baths
    values:
      - Any
      - 1+
      - 1.5+
      - 2+
      - 2.5+
      - 3+
      - 4+
  property_type:
    label: Property Type
    values:
      - House
      - Condo
      - Townhouse
      - Multi-Family
      - Land
      - Manufactured
  listing_status:
    label: Listing Status
    values:
      - For Sale
      - Coming Soon
      - Pending
      - Contingent
      - Sold
  open_house:
    label: Open Houses
    values:
      - Any
      - This Weekend
      - Today
      - Tomorrow
  square_feet:
    label: Square Feet
    min_values:
      - No Min
      - 500+
      - 750+
      - 1000+
      - 1500+
      - 2000+
      - 3000+
    max_values:
      - No Max
      - 1000
      - 1500
      - 2000
      - 3000
      - 5000+
  lot_size:
    label: Lot Size
    values:
      - Any
      - 2,000+ sqft
      - 5,000+ sqft
      - 7,500+ sqft
      - 0.25+ acre
      - 0.5+ acre
      - 1+ acre
  year_built:
    min_values:
      - Any
      - 1950+
      - 1970+
      - 1990+
      - 2000+
      - 2010+
      - 2020+

More Filters Actions

filter_modal_actions:
  clear_all:
    action: reset_all_filter_values
  apply:
    action:
      - close_modal
      - update_results
      - update_map_markers
  close_x:
    action: discard_unsaved_changes

⸻

5. Sort Dropdown

Visible Label

default_label:
  search_page: Newest On Site
  matches_page: Recent Status/Price

Sort Dropdown Values

sort_values:
  - Newest On Site
  - Recent Status/Price
  - Price Low to High
  - Price High to Low
  - Beds
  - Baths
  - Square Feet
  - Lot Size
  - Open House Date

Sort Click Flow

click_sort:
  opens: dropdown
select_sort_value:
  updates:
    - sort_order
    - property_card_order
  closes_dropdown: true

⸻

6. Save Search Modal

Trigger

click_save_search:
  opens: Save Search modal
  overlay: dark_scrim

Modal Fields

modal_title: Save Search
fields:
  search_name:
    type: text_input
    label: Search Name
    default_value: My Home Search
  receive_new_alerts:
    type: select
    label: Receive new alerts
    default_value: Daily
    values:
      - Immediately
      - Daily
      - Weekly
      - Never

Save Search Click Flow

click_receive_new_alerts:
  opens: dropdown
select_alert_frequency:
  updates: alert_frequency
  closes_dropdown: true
click_save_search_cta:
  validation:
    search_name_required: true
  success:
    - close_modal
    - add_sidebar_item_under_my_searches
    - show_toast: Search saved
    - route_optional: /searches/my-home-search
click_close_x:
  closes_modal: true
  discard_changes: true

⸻

7. Property Card

Card Anatomy

property_card:
  image:
    aspect_ratio: 4:3
    overlay_top:
      - Upcoming Open Houses
    overlay_bottom:
      - For Sale
      - price
  body:
    facts:
      - beds
      - baths
      - sqft
    address: full_address
  actions:
    interested_button:
      icon: thumbs_up
      label: Interested
    not_interested_button:
      icon: thumbs_down
      label: icon_only

Property Card Click Flows

click_card_image:
  opens: property_detail_modal
click_property_price:
  opens: property_detail_modal
click_address:
  opens: property_detail_modal
click_interested:
  state_change:
    property.status: interested
  result:
    - button turns green
    - property appears in Interested page
    - property remains visible in current list unless page filters remove it
    - toast: Added to Interested
click_not_interested:
  state_change:
    property.status: not_interested
  result:
    - property removed from current results
    - property appears in Not Interested
    - toast: Moved to Not Interested
    - undo_action_visible: true
click_undo_from_toast:
  state_change:
    property.status: neutral
  result:
    - property returns to previous list

⸻

8. Interested Page

Page Rules

page_title: Interested Homes
content:
  shows_only:
    - property.status == interested
card_actions:
  interested:
    selected: true
  not_interested:
    available: true

Click Flows

click_selected_interested:
  action: remove_from_interested
  result:
    - property.status: neutral
    - remove_from_interested_page
    - toast: Removed from Interested
click_not_interested:
  action: move_to_not_interested
  result:
    - property.status: not_interested
    - remove_from_interested_page
    - add_to_not_interested_page

⸻

9. Not Interested Page

Page Rules

page_title: Not Interested Homes
content:
  shows_only:
    - property.status == not_interested
card_style:
  muted: true
  opacity: reduced_optional

Click Flows

click_interested:
  action: move_to_interested
  result:
    - property.status: interested
    - remove_from_not_interested
    - add_to_interested
click_not_interested_selected:
  action: undo_not_interested
  result:
    - property.status: neutral
    - remove_from_not_interested

⸻

10. My Home Search Page

Visible State

page_title: My Home Search
button: Edit Search
toast: Searching in Custom
map_boundary: rectangle_polygon
sort_default: Recent Status/Price

Click Edit Search

click_edit_search:
  opens: edit_search_modal_or_filter_drawer
editable_fields:
  - Search Name
  - Location
  - Price Min
  - Price Max
  - Beds
  - Baths
  - Property Type
  - Alert Frequency
  - Custom Map Area

Custom Search Chip

chip:
  label: Searching in Custom
  icon_right: x
click_chip_x:
  action:
    - remove_custom_boundary
    - update_results_to_default_location
    - remove_chip

⸻

11. Map Controls

Controls

map_controls:
  zoom_in: +
  zoom_out: "-"
  layers: stacked_layers_icon
  draw:
    default_label: Draw
    active_label: Cancel

Map Click Flows

click_zoom_in:
  action: map.zoom += 1
click_zoom_out:
  action: map.zoom -= 1
click_layers:
  opens: layer_menu
layer_menu_values:
  - Map
  - Satellite
  - Hybrid
  - Terrain

Draw Flow

click_draw:
  state: drawing_mode
  button_label: Cancel
  cursor: crosshair
  instruction: Draw an area on the map
draw_rectangle:
  result:
    - render_boundary_rectangle
    - filter_results_to_boundary
    - show_chip: Searching in Custom
click_cancel_draw:
  action:
    - exit_drawing_mode
    - discard_unfinished_shape
  button_label: Draw

Map Marker Flow

click_price_marker:
  opens: property_preview_card
  preview_contains:
    - image
    - price
    - address
    - beds
    - baths
    - sqft
    - interested_action
    - not_interested_action
click_preview_card:
  opens: property_detail_modal

⸻

12. Property Detail Modal

Trigger

triggers:
  - click_property_card
  - click_map_marker_preview

Layout

property_detail:
  header:
    close_x: true
    favorite_state: true
  media:
    image_carousel: true
    thumbnails: optional
  summary:
    price
    status
    address
    beds
    baths
    sqft
  sections:
    - Overview
    - Description
    - Features
    - Map
    - Open Houses

Actions

actions:
  interested:
    label: Interested
    icon: thumbs_up
  not_interested:
    label: Not Interested
    icon: thumbs_down
  message_agent:
    label: Message
  schedule_tour:
    label: Schedule Tour

Click Flows

click_close_x:
  closes_modal: true
click_interested:
  property.status: interested
  updates_all_lists: true
click_not_interested:
  property.status: not_interested
  closes_modal: true
  removes_from_current_feed: true
click_message_agent:
  route: /messages
  prefill_context:
    property_id
    property_address
click_schedule_tour:
  opens: schedule_tour_modal

⸻

13. My Profile Page

Fields

page_title: My Profile
profile_form:
  first_name
  last_name
  email
  phone

Actions

actions:
  save_profile:
    validation:
      - first_name_required
      - email_valid
    success:
      - show_toast: Profile updated
  cancel:
    action: revert_unsaved_changes

⸻

14. Settings Page

Account & Email Settings

page_title: Account & Email Settings
sections:
  account:
    fields:
      - name
      - email
      - phone
  email_preferences:
    toggles:
      - New listing alerts
      - Price change alerts
      - Status change alerts
      - Open house alerts
  password:
    fields:
      - current_password
      - new_password
      - confirm_password
  danger_zone:
    action:
      - Delete Account

Settings Click Flows

click_toggle:
  action: toggle_boolean
  auto_save: true
  toast: Preferences updated
click_change_password:
  validation:
    - current_password_required
    - new_password_min_8_chars
    - confirm_password_matches
  success:
    - clear_password_fields
    - toast: Password updated
click_delete_account:
  opens: destructive_confirm_dialog

⸻

15. Cookie Banner

Visible In Screens

cookie_banner:
  position: bottom
  text: By using this site, you agree to our Terms of Service & Privacy Policy.
  cta: Continue

Click Flow

click_continue:
  action:
    - dismiss_banner
    - persist_cookie_acknowledgement

⸻

16. Codex Implementation Prompt

SYSTEM:
You are a senior frontend engineer. Build a desktop real-estate search interface matching supplied screenshots. Use Next.js, TypeScript, Tailwind, shadcn/ui, Lucide icons. Implement deterministic UI state. No placeholder dead buttons.
TASK:
Create full clickable prototype with:
1. Sidebar navigation
2. Search page
3. My Matches page
4. My Home Search saved search page
5. Interested page
6. Not Interested page
7. My Profile page
8. Settings page
9. Save Search modal
10. More Filters modal
11. Property Detail modal
12. Map controls with fake interactive state
LAYOUT:
- Left sidebar fixed width 220px.
- Results panel width 580px.
- Map fills remaining viewport.
- Header search bar spans results/map area.
- Cards render in 2-column grid inside results panel.
- Map uses static styled placeholder with positioned price markers.
STATE:
Use local React state:
- activeRoute
- expandedSidebarGroups
- selectedLocation
- minPrice
- maxPrice
- moreFilters
- sortValue
- savedSearches
- likedPropertyIds
- dislikedPropertyIds
- activePropertyModal
- saveSearchModalOpen
- filtersModalOpen
- drawingMode
- customBoundaryActive
- cookieAccepted
DROPDOWNS:
Implement all dropdown values from wireframe:
- Location suggestions
- Price Min
- Price Max
- Sort
- Alert frequency
- More filter values
- Map layers
INTERACTIONS:
Every clickable item must update UI:
- Like moves property into Interested.
- Dislike moves property into Not Interested.
- Sidebar routes switch views.
- Save Search adds item under My Searches.
- Edit Search opens filter modal.
- Draw toggles drawing mode.
- Drawing creates visible custom boundary.
- X on Searching in Custom removes boundary.
- Cookie Continue hides banner.
- Sort reorders cards.
- Price filters reduce visible cards.
- Modal close buttons work.
STYLE:
Use shadcn Card, Button, Input, Select, Dialog, Sheet, Badge, Avatar.
Use Tailwind tokens only.
Dark sidebar.
White content panels.
Blue primary buttons.
Green interested button.
Red dislike outline button.
WCAG AA contrast.
No hardcoded magic spacing beyond token scale.
OUTPUT:
Return complete working code.
Include component files:
- AppShell.tsx
- Sidebar.tsx
- SearchHeader.tsx
- ResultsPanel.tsx
- PropertyCard.tsx
- MapPanel.tsx
- SaveSearchDialog.tsx
- FiltersDialog.tsx
- PropertyDetailDialog.tsx
- ProfilePage.tsx
- SettingsPage.tsx
- mockData.ts

Token cost estimate: ~3.7k tokens
Budget remaining: Depends on Codex context size.