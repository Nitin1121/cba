# Read a large csv file(Mb, Kb) into Fastapi(Backend) and send to React(Frontend) and display the content of the file

Naive approach
  Read the complete csv file into FastAPI memory and send the entire response to React through network call
Naive approach problem
  1. Read a very large csv into FastAPI RAM consume time & memory is a very slow process sometimes the app can crash
  2. Sending a large amount of data through network is very slow
  3. Rendering a large data make the app slow as processing and displaying take time.

Optimized approach
  Frontend:-
    # 1. Request data as required by user demands which can be achieved through pagination or infinite scroll - APproach choosen

  Backend:-
    1. Split the entire CSV into chunks / partition using pandas. Which also has approaches
      i) Entire Chunks list stored into ram serve as per user demand (Consume more ram & memory)
      # ii) Bring only the data requested by client server into ram and serve to user (Less ram & memory) - Approach choosen
    2. Use an inmemory store like:-
      i) FastAPI global in-memory
      ii) Redis cache.



