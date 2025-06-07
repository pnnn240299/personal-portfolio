

D:.
|   App.jsx
|   index.css
|   main.jsx
|   
+---admin
|   +---assets
|   |   +---css
|   |   |       App.css
|   |   |       Contact.css
|   |   |       MiniCalendar.css
|   |   |       
|   |   +---img
|   |   |   +---auth
|   |   |   |       auth.png
|   |   |   |       
|   |   |   +---avatars
|   |   |   |       avatar1.png
|   |   |   |       avatar10.png
|   |   |   |       avatar11.png
|   |   |   |       avatar2.png
|   |   |   |       avatar3.png
|   |   |   |       avatar4.png
|   |   |   |       avatar5.png
|   |   |   |       avatar6.png
|   |   |   |       avatar7.png
|   |   |   |       avatar8.png
|   |   |   |       avatar9.png
|   |   |   |       avatarSimmmple.png
|   |   |   |       
|   |   |   +---dashboards
|   |   |   |       balanceImg.png
|   |   |   |       Debit.png
|   |   |   |       elipse-light.png
|   |   |   |       fakeGraph.png
|   |   |   |       starbucks.jpg
|   |   |   |       usa.png
|   |   |   |       
|   |   |   +---layout
|   |   |   |       logoWhite.png
|   |   |   |       Navbar.png
|   |   |   |       
|   |   |   +---nfts
|   |   |   |       Nft1.png
|   |   |   |       Nft2.png
|   |   |   |       Nft3.png
|   |   |   |       Nft4.png
|   |   |   |       Nft5.png
|   |   |   |       Nft6.png
|   |   |   |       NftBanner1.png
|   |   |   |
|   |   |   \---profile
|   |   |           banner.png
|   |   |           image1.png
|   |   |           image2.png
|   |   |           image3.png
|   |   |
|   |   \---svg
|   |           checked.svg
|   |
|   +---components
|   |   +---calendar
|   |   |       MiniCalendar.tsx
|   |   |
|   |   +---card
|   |   |       CardMenu.tsx
|   |   |       index.tsx
|   |   |       NftCard.tsx
|   |   |
|   |   +---charts
|   |   |       BarChart.tsx
|   |   |       LineAreaChart.tsx
|   |   |       LineChart.tsx
|   |   |       PieChart.tsx
|   |   |
|   |   +---checkbox
|   |   |       index.tsx
|   |   |
|   |   +---dropdown
|   |   |       index.tsx
|   |   |
|   |   +---fields
|   |   |       InputField.tsx
|   |   |       SwitchField.tsx
|   |   |
|   |   +---fixedPlugin
|   |   |       FixedPlugin.tsx
|   |   |
|   |   +---footer
|   |   |       Footer.tsx
|   |   |       FooterAuthDefault.tsx
|   |   |
|   |   +---icons
|   |   |   |   ClockIcon.tsx
|   |   |   |   ClockIcon1.tsx
|   |   |   |   CloseIcon.tsx
|   |   |   |   DarkmodeIcon.tsx
|   |   |   |   DashIcon.tsx
|   |   |   |   DotIcon.tsx
|   |   |   |   KanbanIcon.tsx
|   |   |   |   MarketIcon.tsx
|   |   |   |   NotificationIcon.tsx
|   |   |   |   ProfileIcon.tsx
|   |   |   |   SearchIcon.tsx
|   |   |   |   SignIn.tsx
|   |   |   |   TablesIcon.tsx
|   |   |   |   ThemsIcon.tsx
|   |   |   |   VideoIcon.tsx
|   |   |   |
|   |   |   \---WidgetIcon
|   |   |           ChartIcon.tsx
|   |   |           DollarIcon.tsx
|   |   |           PDFIcon.tsx
|   |   |
|   |   +---navbar
|   |   |       index.tsx
|   |   |       RTL.tsx
|   |   |
|   |   +---popover
|   |   |       index.tsx
|   |   |
|   |   +---progress
|   |   |       index.tsx
|   |   |       
|   |   +---radio
|   |   |       index.tsx
|   |   |
|   |   +---sidebar
|   |   |   |   index.tsx
|   |   |   |
|   |   |   +---components
|   |   |   |       Links.tsx
|   |   |   |       SidebarCard.tsx
|   |   |   |
|   |   |   \---componentsrtl
|   |   |           Links.tsx
|   |   |           SidebarCard.tsx
|   |   |
|   |   +---switch
|   |   |       index.tsx
|   |   |
|   |   +---table
|   |   |       DefaultTable.tsx
|   |   |       generateColumns.ts
|   |   |
|   |   +---tooltip
|   |   |       index.tsx
|   |   |
|   |   \---widget
|   |           Widget.tsx
|   |
|   +---layouts
|   |   +---admin
|   |   |       index.tsx
|   |   |
|   |   \---auth
|   |           index.tsx
|   |
|   +---pages
|   |   |   Settings.tsx
|   |   |
|   |   +---about
|   |   |       index.tsx
|   |   |
|   |   +---auth
|   |   |       SignIn.tsx
|   |   |
|   |   +---blog
|   |   |   |   BlogForm.tsx
|   |   |   |   index.tsx
|   |   |   |
|   |   |   \---components
|   |   |           BlogCard.tsx
|   |   |           Editor.tsx
|   |   |
|   |   +---contact
|   |   |   |   ContactForm.tsx
|   |   |   |   index.tsx
|   |   |   |
|   |   |   \---components
|   |   |           BlogCard.tsx
|   |   |           Editor.tsx
|   |   |
|   |   +---default
|   |   |   |   index.tsx
|   |   |   |
|   |   |   +---components
|   |   |   |       CheckTable.tsx
|   |   |   |       ComplexTable.tsx
|   |   |   |       DailyTraffic.tsx
|   |   |   |       PieChartCard.tsx
|   |   |   |       TaskCard.tsx
|   |   |   |       TotalSpent.tsx
|   |   |   |       WeeklyRevenue.tsx
|   |   |   |
|   |   |   \---variables
|   |   |           tableDataCheck.ts
|   |   |           tableDataComplex.ts
|   |   |
|   |   +---external_links
|   |   |   |   index.tsx
|   |   |   |
|   |   |   \---variables
|   |   |           columns.tsx
|   |   |           tableDataCheck.ts
|   |   |           tableDataComplex.ts
|   |   |
|   |   +---marketplace
|   |   |   |   index.tsx
|   |   |   |
|   |   |   +---components
|   |   |   |       Banner.tsx
|   |   |   |       HistoryCard.tsx
|   |   |   |       TableTopCreators.tsx
|   |   |   |
|   |   |   \---variables
|   |   |           tableDataTopCreators.ts
|   |   |
|   |   +---profile
|   |   |   |   index.tsx
|   |   |   |
|   |   |   \---components
|   |   |           Banner.tsx
|   |   |           General.tsx
|   |   |           Notification.tsx
|   |   |           Storage.tsx
|   |   |           Upload.tsx
|   |   |
|   |   +---profiles
|   |   |   |   index.tsx
|   |   |   |   ProfileForm.tsx
|   |   |   |
|   |   |   \---components
|   |   |           Banner.tsx
|   |   |           SocialLinks.tsx
|   |   |
|   |   +---project
|   |   |   |   index.tsx
|   |   |   |   ProjectForm.tsx
|   |   |   |
|   |   |   +---components
|   |   |   |       Banner.tsx
|   |   |   |       Editor.tsx
|   |   |   |       HistoryCard.tsx
|   |   |   |       NewCard.tsx
|   |   |   |       TableTopCreators.tsx
|   |   |   |
|   |   |   \---variables
|   |   |           tableDataTopCreators.ts
|   |   |
|   |   \---tables
|   |       |   index.tsx
|   |       |
|   |       +---components
|   |       |       CheckTable.tsx
|   |       |       ColumnsTable.tsx
|   |       |       ComplexTable.tsx
|   |       |       DevelopmentTable.tsx
|   |       |
|   |       \---variables
|   |               tableDataCheck.ts
|   |               tableDataColumns.ts
|   |               tableDataComplex.ts
|   |               tableDataDevelopment.ts
|   |
|   +---routes
|   |       excludedRoutes.tsx
|   |       index.tsx
|   |
|   +---types
|   |       hui-types.d.ts
|   |       images.d.ts
|   |       react-table-config.d.ts
|   |       stylis.d.ts
|   |
|   \---variables
|           charts.js
|
+---frontend
|   |   routes.tsx
|   |
|   +---assets
|   |   +---images
|   |   |   |   black-noise.png
|   |   |   |   maskimage.svg
|   |   |   |   noise.png
|   |   |   |   self.svg
|   |   |   |   shakehands.svg
|   |   |   |
|   |   |   \---photo
|   |   |           photo-1706049379414-437ec3a54e93.avif
|   |   |           photo-1709949908058-a08659bfa922.avif
|   |   |
|   |   +---projects
|   |   |   \---mockups
|   |   |           cp.png
|   |   |           cursify.png
|   |   |           eh1.png
|   |   |           fi1.png
|   |   |           janvry.png
|   |   |           kyte1.png
|   |   |           ljs1.png
|   |   |           qd1.png
|   |   |           sf.png
|   |   |           sp.png
|   |   |           vk.png
|   |   |
|   |   +---sfx
|   |   |       click.wav
|   |   |
|   |   \---skills
|   |           css.svg
|   |           express.svg
|   |           figma.svg
|   |           framer.svg
|   |           github.svg
|   |           html.svg
|   |           js.svg
|   |           mongo.svg
|   |           mysql.svg
|   |           next.svg
|   |           node.svg
|   |           npm.svg
|   |           postgresql.svg
|   |           postman.svg
|   |           react.svg
|   |           redux.svg
|   |           star.svg
|   |           tailwind.svg
|   |           typescript.svg
|   |
|   +---components
|   |   |   FuzzyOverlay.jsx
|   |   |   Hero.jsx
|   |   |   MaskImage.jsx
|   |   |   Navbar.jsx
|   |   |   SEO.jsx
|   |   |
|   |   +---common
|   |   |       aboutus.jsx
|   |   |       Banner.jsx
|   |   |       experience.jsx
|   |   |       fluid-cursor.jsx
|   |   |       footer.jsx
|   |   |       mousetrail.jsx
|   |   |       project.jsx
|   |   |       ResumeActions.jsx
|   |   |       RevealLinks.jsx
|   |   |       ScrollStack.jsx
|   |   |       skills.jsx
|   |   |
|   |   \---ui
|   |           animated-shiny-text.jsx
|   |           badge.tsx
|   |           button.tsx
|   |           card.tsx
|   |           FamilyButton.jsx
|   |           flip-words.jsx
|   |           HoverImageLinks.jsx
|   |           meteors.jsx
|   |           pre-loader.jsx
|   |           scroll-element.jsx
|   |           sheet.tsx
|   |           sparkles.jsx
|   |           text-shinner.jsx
|   |
|   +---layouts
|   |       index.tsx
|   |
|   +---lib
|   |       blogData.json
|   |       fluidcursor.js
|   |       projects.js
|   |       utils.ts
|   |
|   \---pages
|           AboutPage.jsx
|           BlogDetails.jsx
|           BlogPage.jsx
|           ContactPage.jsx
|           HomePage.jsx
|           ProjectDetails.jsx
|           ProjectPage.jsx
|
+---hooks
|       useFormState.js
|
+---lib
|       supabaseClient.js
|       useDataCRUD.js
|
+---models
|   \---supabaseQuery
|           project.js
|
+---providers
|       index.js
|       restApiProvider.js
|       supabaseProvider.js
|
+---services
\---types
        external_links.ts