
//--------- Fetching categories data
        async function GetCategorydata() {
            try {
                const response = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');
                const data = await response.json();
                let Container = document.querySelector('.container');
                Container.innerHTML = null;
                data.categories.forEach((data) => {
                    {
                        const categoryCard = document.createElement('div');
                        categoryCard.classList = 'card';
                        categoryCard.innerHTML = `
                        <div class="imgBx">
                            <img src="${data.strCategoryThumb}" alt="Beef" />
                        </div>
                        <div class="content">
                            <h2 class="card-header">${data.strCategory}</h2>
                            <p>${data.strCategoryDescription} </p>
                        </div>
                        `;
                        const button = document.createElement('button');
                        button.textContent = 'Details';
                        button.classList = 'ShowRecipeButton';
                        categoryCard.appendChild(button);

                        // Activating Category button
                        button.addEventListener('click', () => {
                            OpenCategoryDetails(data);
                        });
                        Container.appendChild(categoryCard);
                    }
                });
            } catch (err) {
                console.log('Err', err);
                document.querySelector('.container').innerHTML =
                    "<div class='RecepieNotfound'><h2>Ooopss!.. Not Found</h2><h3>Try Other Category</h3></div>";
            }
        }
        GetCategorydata();

//----------Home Swith Function

        function ReloadHome(){
            document.querySelector('.Recipe-Details').style.display = 'none';
            document.querySelector('.container').style.display = 'flex';
            GetCategorydata();
        }

//-----------  function to Popup Category details
        function OpenCategoryDetails(data) {
            // console.log(data);
            let recipeContent = document.querySelector('.card-container');
            //console.log(data);
            let content = '';
            content = `
                <div class="imgwrapper">
                <img src="${data.strCategoryThumb}" alt="${data.strCategory}" />
                <h3>${data.strCategory}</h3>
            </div>
            <div class="Instructionwrapper">
                <h2>DESCRIPTION</h2>
                <div class="content">
                ${data.strCategoryDescription}
                </div>
            </div>
                `;
            recipeContent.innerHTML = content;
            document.querySelector('.container').style.display = 'none';
            document.querySelector('.Recipe-Details').style.display = 'block';
        }

//------------- fetching Search Recepie Data

        async function fetchRecepie(item) {
            try {
                const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${item}`);
                const data = await response.json();
                let Container = document.querySelector('.container');
                Container.innerHTML = null;
                data.meals.forEach((data) => {
                    {
                        const recipeCard = document.createElement('div');
                        recipeCard.classList = 'card-recipie';
                        recipeCard.innerHTML = `
                        <div class="imgBx">
                            <img src="${data.strMealThumb}" alt="Beef" />
                        </div>
                        <div class="content" id="content-recipe-detail">
                            <h2 class="card-header">${data.strMeal}</h2>
                            <div class="card-recipe-detail">
                                <h4>${data.strArea} Dish</h4>
                                <h4> Category : ${data.strCategory}</h4>
                            </div>
                        </div>
                        `;
                        const button = document.createElement('button');
                        button.textContent = 'Show Recipe';
                        button.classList = 'ShowRecipeButton';
                        recipeCard.appendChild(button);

                        // Activation show recepie button
                        button.addEventListener('click', () => {
                            OpenRecipeDetails(data);
                        });
                        Container.appendChild(recipeCard);
                    }
                });
            } catch (err) {
                console.log('Err', err);
                document.querySelector('.container').innerHTML =
                    "<div class='RecepieNotfound'><h2>Ooopss!.. Not Found</h2><h3>Try Other Category</h3></div>";
            }
        }

//------------ Activating Search button
        const SearchBox = document.querySelector('.searchBox');
        const SearchBtn = document.querySelector('.searchbtn');

        SearchBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const searchInput = SearchBox.value.trim();
            fetchRecepie(searchInput);
        });

//----------- Function to close the pop up recipie

        // function to fetch Ingredients and measurements
        function fetchIngredients(data) {
            //console.log(data.strIngredient1);
            let ingredientsList = '';
            for (let i = 1; i <= 20; i++) {
                const ingredient = data[`strIngredient${i}`];
                if (ingredient) {
                    const measure = data[`strMeasure${i}`];
                    ingredientsList += `<li>${measure}-${ingredient}</li>`;
                } else {
                    break;
                }
            }
            return ingredientsList;
        }

        function OpenRecipeDetails(data) {
            let recipeContent = document.querySelector('.card-container');
            //console.log(data);
            let content = '';

            content = `
                <div class="imgwrapper">
                <img src="${data.strMealThumb}" alt="${data.strMeal}" />
                <h3>${data.strMeal}</h3>
            </div>
            <div class="IngredientWrapper">
                <h2>INGREDIENTS</h2>
                <div class="content">
                    <ol>
                    ${fetchIngredients(data)}
                    </ol>
                </div>
            </div>
            <div class="Instructionwrapper">
                <h2>INSTRUCTION</h2>
                <div class="content">
                ${data.strInstructions}
                </div>
            </div>
                `;
            recipeContent.innerHTML = content;
            document.querySelector('.container').style.display = 'none';
            document.querySelector('.Recipe-Details').style.display = 'block';
        }

//---------- Function to close the pop up recipie
        let CloseRecipe = document.querySelector('#to-cancel');
        CloseRecipe.addEventListener('click', (e) => {
            e.preventDefault();
            document.querySelector('.Recipe-Details').style.display = 'none';
            document.querySelector('.container').style.display = 'flex';
            
        });

//------------ Random Meals
        async function randomMeals() {
            try {
                const response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
                const data = await response.json();
                //console.log(data);
                let Container = document.querySelector('.container');
                Container.innerHTML = null;
                data.meals.forEach((data) => {
                    {
                        const recipeCard = document.createElement('div');
                        recipeCard.classList = 'card-recipie';
                        recipeCard.innerHTML = `
                    <div class="imgBx">
                        <img src="${data.strMealThumb}" alt="Beef" />
                    </div>
                    <div class="content" id="content-recipe-detail">
                        <h2 class="card-header">${data.strMeal}</h2>
                        <div class="card-recipe-detail">
                            <h4>${data.strArea} Dish</h4>
                            <h4> Category : ${data.strCategory}</h4>
                        </div>
                    </div>
                    `;
                        const button = document.createElement('button');
                        button.textContent = 'Show Recipe';
                        button.classList = 'ShowRecipeButton';
                        recipeCard.appendChild(button);

                        // Activation show recepie button
                        button.addEventListener('click', () => {
                            OpenRecipeDetails(data);
                        });
                        Container.appendChild(recipeCard);
                    }
                });
            } catch (err) {
                console.log('Err', err);
                document.querySelector('.container').innerHTML =
                    "<div class='RecepieNotfound'><h2>Ooopss!.. Not Found</h2><h3>Try Other Category</h3></div>";
            }
        }

//-------- Random Button Activating

            let RandomButton = document.querySelector('.searchRandom');
            RandomButton.addEventListener('click', (e) => {
                e.preventDefault();
                randomMeals();
            });
