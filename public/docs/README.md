# Why the _fragments dir is checked in
 
Within this repo files generated as a result of shredding the `_examples` dir ( the contents of the `_fragments` dir) are checked in so that we can avoid running the
shredder over the entire `_examples` dir each time someone refreshes the repo ( the `shred-full` gulp task). 
The gulp `serve-and-watch` shredder is only a ‘partial’ shredder. It only shred’s files in directories changed during
the current session. 
