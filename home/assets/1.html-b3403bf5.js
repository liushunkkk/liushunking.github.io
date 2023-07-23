import{_ as i,o as l,c as r,a}from"./app-5a5db9de.js";const e={},t=a('<h2 id="操作系统" tabindex="-1"><a class="header-anchor" href="#操作系统" aria-hidden="true">#</a> 操作系统</h2><h3 id="进程和线程区别-为什么要有线程" tabindex="-1"><a class="header-anchor" href="#进程和线程区别-为什么要有线程" aria-hidden="true">#</a> 进程和线程区别，为什么要有线程</h3><p>（1）线程：是轻量型进程，由进程创建，是系统进行<strong>独立调度和分配</strong>的基本单位，线程会与同属于一个进程的其他线程共享该进程所具备的资源，但是线程本身也具备一些自己特有的信息，比如<strong>程序寄存器</strong>、<strong>堆栈</strong>等。</p><p>（2）进程：是系统进行<strong>资源分配</strong>的基本单位，创建一个进程，系统会为其分配相应的内存空间等资源。进程实际就是运行的一个程序。一个进程可以拥有一个或者多个线程，线程的引入增加了并发度。</p><p>（3）举个栗子（比喻句）：就像是火车与车厢一样。</p><ol><li>线程可以看作是轻量级进程，其是处理器调度和执行的基本单位。一个进程拥有&gt;=1个线程，同一个进程拥有的线程共享该进程所分配的资源，<strong>地址资源以及CPU资源</strong>等，<strong>线程之间可并发执行</strong>。</li><li>出现线程的原因是进程是拥有资源分配的基本单位，进程<strong>上下文切换所需时间太多</strong>，基于此，产生将“资源分配的基本单位”与“处理机调度的基本单位区分开的想法”。</li><li>使得<strong>并发度提高</strong>。</li></ol><h3 id="线程分类" tabindex="-1"><a class="header-anchor" href="#线程分类" aria-hidden="true">#</a> 线程分类</h3><ol><li>内核级（KLT）线程： （1）线程的创建、切换、调度都是在<strong>操作系统内核</strong>实现的。 （2）优点：一个进程中的线程被<strong>阻塞</strong>了，<strong>还可以调用该进程中的其他线程</strong>。 在多处理器中，内核可以调用同一个进程中的多个线程同时进行处理。 （3）缺点：一个进程中的线程之间进行切换（切换代价大）时，需要从用户态---&gt;内核态--&gt;用户态，因为切换是在内核实现的，所以费时。而且线程的创建费时间。</li><li>用户级（ULT）线程 ： （1）线程的创建、撤销、切换、管理都是在用户空间进行的，无需内核支持，内核甚至并不知道这些线程。 （2）优点：线程之间的切换<strong>不需要转换到内核态</strong>，节省了内核空间、也节省了时间。 用户级线程的实现和操作系统无关。 （3）缺点：一个进程中有一个线程被阻塞了，该进程就被阻塞了。一个进程只能在一个CPU上获得执行。 为什么会这样呢？ 答：是因为操作系统<strong>内核根本不知道线程的存在</strong>，他只看得到进程，所以在他眼中是进程被阻塞了。</li></ol><h3 id="操作系统的作用、功能、特性" tabindex="-1"><a class="header-anchor" href="#操作系统的作用、功能、特性" aria-hidden="true">#</a> 操作系统的作用、功能、特性</h3><p>操作系统一种控制和管理软件和硬件资源、合理地对各类作业进行调度、以便方便用户的程序集合</p><ol><li><p>操作系统的作用： （1）操作系统是<strong>系统资源的管理者</strong>。 （2）操作系统是<strong>用户</strong>和计算机<strong>硬件</strong>系统之间的<strong>接口</strong>。 （3）操作系统实现了对系统<strong>资源的抽象</strong>。</p></li><li><p>操作系统的功能： <strong>存储器、处理器、文件、设备等的组织和管理</strong>，提供用户和计算机系统之间的接口。</p></li><li><p>操作系统的特性： （1）<strong>并发性</strong>：区分并行和并发，并发性指的是系统中同时存在多个运行的程序。在这里操作系统引入进程的目的是实现并发。 （2）<strong>共享性</strong>：指的是资源的共享，是指同一资源可为多个并发执行的进程所共享。 两种共享的方式：互斥共享（临界资源）和同时访问 （3）<strong>虚拟性</strong>：时分复用技术（分时系统）和空分复用技术（虚拟存储技术） （4）<strong>异步性</strong>：指进程并非一次性执行完，而是走走停停已不可预知的速度向前推进。</p></li></ol><h3 id="操作系统的调度算法" tabindex="-1"><a class="header-anchor" href="#操作系统的调度算法" aria-hidden="true">#</a> 操作系统的调度算法</h3><p><strong>先到先服务调度</strong></p><p>（等待时间长）</p><ul><li>最简单的CPU调度算法是先到先服务FCFS调度算法。采用这种方案，先请求CPU的进程首先分配到CPU。FCFS策略可以通过FIFO队列容易的实现。当一个进程进入就绪队列时，它的PCB会被链接到队列尾部。当CPU空闲时，它会分配给位于队列头部的进程，并且这个运行进程从队列中移去。</li><li>FCFS策略的缺点是，平均等待时间往往很长。由于所有其他进程都等待一个大进程释放CPU，称这种情况护航效果convoy effect，与让较短进程先进行相比，这会导致CPU和设备的使用率降低。</li><li>也要注意FCFS调度算法是非抢占的。一旦CPU分别分配给了一个进程，该进程就会使用CPU直到释放CPU为止，即程序终止或是请求i/o。</li></ul><p><strong>最短作业优先调度</strong></p><p>（等待时间短，但是存在饥饿）</p><ul><li>最短作业优先shortest-job-first,SJF调度算法。这个算法将每个进程与其下次CPU执行的长度关联起来。当CPU变为空闲时，他会被赋给具有最短CPU执行的进程。如果2个进程具有同样长度的CPU执行，那么可以由FCFS来处理。</li><li>可以证明SJF调度算法是最优的。这是因为对于给定的一组进程，SJF算法的平均等待时间最小。通常将短进程移到长进程之前，短进程的等待时间减少大于长进程的等待时间增加。因而，平均等待时间减少。</li><li>SJF算法可以是抢占的或非抢占的。当一个新进程到达就绪队列而以前进程正在执行，就需要选择了。新进程的下次CPU执行，与当前运行进程的尚未完成的CPU执行相比，可能还要小。抢占SJF算法就会抢占当前运行进程，而非抢占SJF算法会允许当前运行进程可以先完成CPU执行，抢占SJF调度有时称为最短剩余时间优先shortest-remaining-time-first调度。</li></ul><p><strong>优先级调度</strong></p><ul><li>每个进程都有一个优先级与其关联，而只有最高优先级的进程会分配到CPU。相同优先级的进程按FCFS顺序调度。</li><li>优先级通常为固定区间0-7,0-4095等的数字。不过对于零表示最高还是最低的优先级没有定论。</li><li>优先级调度算法的一个主要问题是无穷阻塞indefinite blocking或饥饿starvation。就绪运行但是等待CPU的进程可以认为是阻塞的，优先级调度算法可以让某个低优先级进程无穷等待CPU。</li><li>无穷等待问题的解决方案之一是老化aging。老化逐渐增加在系统中等待很长时间的进程的优先级。可以选择每隔多长时间提升等待进程的优先级。</li></ul><p><strong>轮转调度</strong>（响应快，周转长）</p><ul><li>轮转调度算法是专门为分时系统设计的。它类似于FCFS调度，但是增加了抢占以切换进程。将一个较小时间单元定义为时间量time quantum或时间片time slice。时间片的大小通常为10到100毫秒。就绪队列作为循环队列。CPU调度程序循环整个就绪队列，为每个进程分配不超过一个时间片的CPU。</li><li>在RR调度算法中，没有进程被连续分配超过一个时间片的CPU（除非他是唯一一个可运行的进程），如果进程的CPU执行超过一个时间片，那么该进程就会被抢占，并被放回到就绪队列中，因此，RR调度算法是抢占的。</li><li>RR算法的性能很大程度上取决于时间片的大小。在一种极端情况下，如果时间片很大，那么RR算法就与FCFS算法一样，如果时间片很小，那么RR算法可能导致大量的上下文切换。</li></ul><p><strong>多级队列调度</strong></p><ul><li>进程通常分为前台进程（或交互进程）和后台进程（或批处理进程）。这两种类型的进程具有不同的响应时间要求，进而也有不同的调度需要。另外，与后台进程相比，前台进程可能需要更高的优先级（外部定义）。</li><li>多级队列调度算法（multilevel queue）将就绪队列分成多个单独队列，根据进程属性，如内存大小，进程优先级，进程类型等，一个进程<strong>永久的</strong>分配到一个队列，每个队列都有自己的调度算法，例如可以前台队列使用RR轮转调度，后台进程使用FCFS算法</li><li>此外队列之间应有调度，通常采用固定优先级抢占调度，例如，前台队列可以比后台队列具有绝对的优先。</li><li>另一种可能是，在队列之间划分时间片，每个队列都有一定比例的CPU时间，可用于调度队列内的进程，但是不同的队列，时间比例不同；</li></ul><p><strong>多级反馈队列调度</strong></p><ul><li>通常在使用多级队列调度算法时，进程进入系统时被永久的分配到某个队列，进程不能在队列间移动，这样虽然调度开销低，但是不够灵活。</li><li>多级反馈队列（multilevel feedback queue）调度算法允许进程在队列间迁移，根据不同CPU执行的特点来区分进程，如果使用过多的CPU时间，那么他会被移到更低的优先级队列，这种方案将I/O密集型和交互进程放在更高优先级队列上，此外，在较低优先级队列中等待过长的进程会被移到更高优先级队列，这种形式的老化阻止饥饿的发生。</li><li>多级反馈队列调度程序的定义使其成为<strong>最通用</strong>的CPU调度算法。通过配置，他能适用所设计的特定系统，遗憾的是，由于需要一些方法来选择参数一定义最佳的调度选择，所以她也是最复杂的算法。</li></ul><h3 id="死锁" tabindex="-1"><a class="header-anchor" href="#死锁" aria-hidden="true">#</a> 死锁</h3><ol><li><p>死锁的定义：产生死锁的<strong>一组进程</strong>中的每个进程都在<strong>等待</strong>该组进程中<strong>其他进程所拥有的资源</strong>，使得所有的进程都无法向下推进，即为死锁。（专业定义就是：形成的资源分配图（无环）无法化简完全）。</p></li><li><p>死锁产生的原因：四个原因，<strong>互斥性、占有并等待、非抢占、循环等待</strong>。</p></li><li><p>解决死锁的四种方法： （1）死锁的预防：破坏死锁产生的三个（互斥性一般无法破坏）条件之一即可。 1）破坏非抢占条件：或者如果所请求的资源无法满足，那么之前具有的也会释放。 2）破坏占有并等待条件：必须一次性将所需要的资源全部分给它，如果无法全部分配就一个也不给。 3）破坏循环等待条件：给资源编号，顺序资源分配法。在过程中，只要申请了资源编号为Ri的资源，以后的申请就只能申请资源编号大于Ri的。 （2）死锁的避免：安全性检查算法。先看能不能给他，再假设给他，看是否存在一条安全性序列，不存在的话就不安全。（不安全的状态有可能会导致死锁，安全状态不会的）。 （3）死锁的检测：构造资源分配表，看是否能够化简完全（即看是否存在环路）。 （4）死锁的解除：一般是撤销一部分进程使得死锁解除。</p><p>或者直接忽视，认为不会发生死锁</p></li><li><p>死锁的避免（安全性检查：银行家算法） （1）首先判断资源的请求是否正确：即首先请求的资源&lt;=需要的资源数并且系统具有的资源&gt;请求的资源。 （2）安全性检查：然后假设分给它，看是否会进入不安全状态。</p></li></ol><h3 id="内存管理" tabindex="-1"><a class="header-anchor" href="#内存管理" aria-hidden="true">#</a> 内存管理</h3><p><strong>连续的内存分配（每个进程分配连续的空间）</strong> 内存中的剩余空间用一张空闲分区表存储记录 （1）单一连续分配：每次只有一个进程进入内存，为其分配连续的地址。简单、但是利用率很低。</p><p>（2）固定分区分配：</p><ul><li>1）分区大小相同：就是将内存分成大小固定且相同的分区，每个进程占用一个分区。好控制，但是会产生内部碎片。</li><li>2）分区大小不同：就是分为一部分小分区、中分区、大分区。</li></ul><p>（3）<strong>动态分区分配</strong>：不事先将内存分区，按照进程所需空间进行动态分配，分区个数和大小会一直变化。有四种算法，在过程中会利用交换的方式，将目前不会运行的进程换出，会产生外部碎片，可使用动态重定位寄存器进行紧凑，但是费时。 1）首次适应算法 2）循环首次适应算法：这两个都是将空闲分区按照地址从小到大链接起来，1）是从头开始选择第一个满足请求的空闲分区。该算法是最简单且最优的，但是会造成低地址部分有很多碎片，而且每次查找都会先查找这些碎片，增加了查找的开销。2）是从上一次找到的空闲分区中的下一个分区开始找到第一个满足请求的空闲分区。 3）最佳适应算法：将空闲分区按照从小从小到大来链接起来，从头开始选择第一个满足需要的分区。会产生很多外部的小碎片无法利用。 4）最坏适应算法：将空闲分区按照从从大到小来链接起来，从头开始选择第一个满足需要的分区。缺点是大作业无法进入。</p><p><strong>非连续的内存分配管理（重要）（每个进程分配的空间不是连续的）</strong></p><p>（1）基本分页式（地址是一维的）：可以多级分页</p><ul><li>1）将每个进程都分成若干大小相同的页面，内存分成大小相同的页框。每个进程都有一个页表，是用于形式地址到物理地址的映射。</li><li>2）页面的大小需要注意：页面越小会使得碎片大小越小，内存利用率越高，但是会使得每个进程占用的页面个数增多，页表过大，占用内存的同时也会增加硬件地址转换的开销。页面过大会使得页面内碎片变得过大，内存利用率降低，但是页表长度小而且地址转换速度快。 所以需要在时间和空间进行权衡。</li><li>3）引入块表机制，在高速缓冲寄存器中建立块表（TLB），利用程序的局部性原理提高地址转换的速度。</li></ul><p>（2）分段式（地址空间两维：段号+段内地址，因为每个段的大小不一致，所以一定要都有，我们段表中有段号、段长度、本段在内存的起始地址）：对进程进行逻辑的分段，易于理解以及进程对段的共享。</p><p>（3）段页式存储管理方式：段号+页号+页内地址，每次访问都需要访存三次。</p><p>分页和分段比较</p><ul><li>基本分页存储管理是站在<strong>计算机的</strong>角度考虑的，不具备逻辑性，以增加内存利用率为主，地址的变换由硬件决定。</li><li>但是基本分段式是站在<strong>用户程序员的角度</strong>来的，是具备逻辑性的，有利于信息的共享，只需要在段表中增加一个段表项即可进行共享段。</li></ul><h3 id="虚拟内存技术" tabindex="-1"><a class="header-anchor" href="#虚拟内存技术" aria-hidden="true">#</a> 虚拟内存技术</h3><ul><li>虚拟内存技术允许执行进程不必完全在内存中。这种方案的优点就是程序可以比物理内存大。</li><li>而且，虚拟内存将内存抽象成一个巨大的、统一的存储数组，将用户看到的逻辑内存与物理内存分开。这允许程序员不受内存存储的限制。</li><li>虚拟内存也允许进程容易地共享文件和地址空间，还为创建进程提供了有效的机制。</li><li>但虚拟内存的实现并不容易，如果使用不当会大大地降低性能。</li></ul><p>页置换算法</p><ul><li><p>最简单的页置换算法是FIFO算法。FIFO页置换算法为每个页记录着该页调入内存的时间。当必须置换一页时，将选择最旧的页。注意并不需要记录调入一页的确切时间。可以创建一个FIFO队列来管理内存中的所有页。队列中的首页将被置换。当需要调入页时，将它加到队列的尾部。容易理解和实现，但性能并不总是很好，有 <strong>Belady 异常</strong>:对有的页置换算法，页错误率可能会随着所分配的帧数的增加而增加，而原期望为进程增加内存会改善其性能。</p></li><li><p>最优页置换算法(optimal page-replacement algorithm)是所有算法中产生页错误率最低的,且绝没有Belady 异常的问题。这种算法确实存在，它被称为OPT 或MIN。<strong>它会置换最长时间不会使用的页</strong>。使用这种页置换算法确保对于给定数量的帧会产生最低可能的页错误率。</p></li><li><p>最近最少使用算法（least-recently-used(LRU) algorithm)。LRU置换为每个页关联该页上次使用的时间。当必须置换一页时，LRU选择最长时间没有使用的页。它的问题是为页帧确定一个排序序列，这个序列按页帧上次使用的时间来定。有两种可行实现:</p><ul><li>计数器:简单情况是，为每个页表项关联一个使用时间域，并为CPU增加一个逻辑时钟或计数器。对每次内存引用，计数器都会增加。置换具有最小时间的页。</li><li>栈:另一个方法是采用页码栈。每当引用一个页，该页就从栈中删除并放在顶部。栈顶部总是最近使用的页，栈底部总是LRU页。每次替换最底部</li></ul></li></ul><h3 id="文件分配" tabindex="-1"><a class="header-anchor" href="#文件分配" aria-hidden="true">#</a> 文件分配</h3><ol><li><p>文件分配的方式 （1）连续分配方式：给每个文件分配连续的盘块，记录该文件的表项含有文件名、文件其实盘块地址、占有的盘块数目。 缺点：只适合文件大小固定不变的情况，会产生外部碎片，文件大小改变时，需要移动大量的数据。 （2）链接分配的方式：包括隐式链接和显示链接。 1）隐式链接就是每个盘块有指向下一个盘块的指针，每个文件只需记录文件名、初始盘块的地址以及最后的盘块的地址即可。解决了产生碎片的问题。 缺点：如果中间指针除了错误，就产生文件数据的丢失。 2）显式链接就是磁盘有张FAT表，里面显式的记录了每个盘块指向的下一个盘块号的指针。还可以用特殊的数字记录哪些盘块是空的（-2）等。 优点：FAT表在启动时会被装入内存，查找速度很快且大量减少了I/O操作的次数。 1）和2）的缺点：解决了连续分配方式产生外部碎片，但是无法直接访问一个盘块，只能进行顺序访问。 （3）索引分配的方式（是指对）：想实现直接访问盘块，不需要再顺序访问。为每一个文件分配一个索引表，表中记录了为该文件分配的每一个磁盘块的地址。索引表的第i个条目指向该文件的第i块。（相当于数组）所以要访问文件某个块时，直接找到相应的索引表的相应条目即可找到地址。（第i块----&gt;第i个条目）。</p></li><li><p>文件存储空间的管理（<strong>空闲盘块的管理</strong>）：</p></li></ol><ul><li>空闲链表法：根据链接的单位不同，可分为： 1）空闲盘块链：将空闲盘块作为基本单位形成一个链，每次请求都从链表头部开始分给它适当个数的盘块。每次回收将回收的空闲盘块链接到链表的末尾即可，这种操作对于分配和回收操作非常的方便。但是对于一个文件分配块时要经过多次操作。 2）空闲盘区链：是以分区为单位进行链接的，每个空闲分区不仅有指向下一个空闲分区的指针，还记录了该分区包含的盘快数目。分配和回收的方法跟内存连续分配方式中的动态分区分配算法很像，他们采用的调度策略也相同。（通常采用首次适应），回收要进行合并。</li><li>位视图法（已知每行的位数去求即可）：磁盘中的每一个盘块都有一个二进制位表示状态，0表示空闲，1表示被使用。我们用二维数组记录。 分配：遍历位视图，找出值为0的若干块，根据行号、列号计算盘块号并修改位视图的值为1。 回收：根据盘块号求出行号、列号，修改位视图相应位置为0即可。</li></ul><h3 id="磁盘的组织和管理" tabindex="-1"><a class="header-anchor" href="#磁盘的组织和管理" aria-hidden="true">#</a> 磁盘的组织和管理</h3><ol><li><p>磁盘有盘面、磁道、扇区、柱面。</p></li><li><p>柱面：指的是同一个磁道不同磁面。</p></li><li><p>存一个数据，如果一个磁道存不下，剩余的是存在同一个盘面不同磁道好还是存在不同盘面同一个磁道（即同一个柱面）好？ 答：肯定是后者好，<strong>不需要移动磁头臂</strong>，只需要系统磁头读取数据即可。</p></li><li><p>磁盘地址用&quot;柱面号·盘面号·扇区号（或块号）&quot;表示</p></li><li><p>磁盘调度算法： 注意：一次磁盘调度所需要的时间=寻道时间（包括启动磁头臂的时间）+旋转延迟（找到相应的扇区）的时间+传输数据的时间 （1）FCFS：根据进程请求访问磁盘的先后顺序依次访问。公平、对于聚簇性的访问比较好。 （2）最短寻道时间优先SSTF：选择的磁道是距离当前访问磁道最近的。（但是会产生饥饿，这是最短调度算法的通病，只要持续的有更短的请求到来，就永远不会调度距离远的） （3）Scan算法：又称为电梯调度算法。在当前磁头移动方向上去选择距离最近的请求去访问。再最短寻道时间优先的基础上+磁头移动方向的限制。 （4）循环Scan算法：再Scan的基础上规定磁头只能单向移动。增加了公平性。</p><p>（5）LOOK：在SCAN基础上，磁头移动只需要达到最远端的一个请求即可返回，不需要达到磁盘端点</p><p>（6）C-LOOK：在C-SCAN基础上，磁头移动只需要达到最远端的一个请求即可返回，不需要达到磁盘端点</p></li></ol><h3 id="批处理系统是什么" tabindex="-1"><a class="header-anchor" href="#批处理系统是什么" aria-hidden="true">#</a> 批处理系统是什么</h3><p>批处理系统，又名批处理操作系统。批处理是指用户将一批作业提交给操作系统后就不再干预，由操作系统控制它们自动运行。这种采用批量处理作业技术的操作系统称为批处理操作系统。批处理操作系统分为单道批处理系统和多道批处理系统。批处理操作系统不具有交互性，它是为了提高CPU的利用率而提出的一种操作系统。</p><p>批处理系统分为单道批处理系统和多道批处理系统</p><p>单道批处理：在内存中仅有一道程序，系统中的资源得不到充分的利用</p><p>多道批处理：在内存中可同时存在若干道作业，这些作业是通过一定的作业调度算法来使用CPU的，一个作业在等待I/O处理时，CPU调度另外一个作业运行。资源利用率高、系统吞吐量大、平均周转时间长、无交互能力</p><h3 id="简述分时技术" tabindex="-1"><a class="header-anchor" href="#简述分时技术" aria-hidden="true">#</a> 简述分时技术</h3><p>将处理机的响应时间分成大小相等（或不等）的时间片，所有终端用户依次或轮流获得一个时间片，可以运行程序，当时间片用完，暂停运行，等待下一次时间片分配</p><h3 id="简述内核态、用户态" tabindex="-1"><a class="header-anchor" href="#简述内核态、用户态" aria-hidden="true">#</a> 简述内核态、用户态</h3><p>为了保护操作系统内核的数据和代码，执行应用程序时，处理机处于用户态。</p><p>若需要使用到计算机资源或适用OS提供的功能，则需要通过系统调用，转为执行OS内核代码，此时处于系统态或内核态</p><h3 id="区分中断和异常" tabindex="-1"><a class="header-anchor" href="#区分中断和异常" aria-hidden="true">#</a> 区分中断和异常</h3><p>中断是指 CPU 对系统发生某事件时的这样一种响应:</p><p>CPU 暂停正在执行的程序，在保留现场后自动地转去执行该事件的中断处理程序；执行完后，再返回到原程序的断点处继续执行。</p><p>可进一步把中断分为外中断和内中断。</p><p>外中断——就是我们指的中断——是指由于<strong>外部设备事件</strong>所引起的中断，如通常的磁盘中断、打印机中断、即输入输出等；</p><p>内中断——就是异常——是指由于 <strong>CPU 内部事件所引起的中断</strong>，如程序出错(非法指令、地址越界)。内中断(trap)也被译为“捕获”或“陷入”。</p><p>异常是由于执行了现行指令所引起的。由于系统调用引起的中断属于异常。</p><p>中断则是由于系统中某事件引起的，该事件与<strong>现行指令</strong>无关。</p><h3 id="进程的状态有哪些" tabindex="-1"><a class="header-anchor" href="#进程的状态有哪些" aria-hidden="true">#</a> 进程的状态有哪些</h3><ol><li>新的：进程正在创建</li><li>运行：指令正在执行</li><li>等待：进程等待发生某个事件（如I/O完成或收到信号）</li><li>就绪：进程等待分配处理器</li><li>终止：进程已经完成执行</li></ol><h3 id="说说进程间通信方式" tabindex="-1"><a class="header-anchor" href="#说说进程间通信方式" aria-hidden="true">#</a> 说说进程间通信方式</h3><p>进程间通信有两种基本类型：共享内存和消息传递。</p><p>共享内存模型会建立起一块供协作进程共享的内存区域，进程通过向此共享区域读出或写入数据来交换信息。</p><p>消息传递模型通过在协作进程间交换消息来实现通信。</p><p>网络进程通信（客户机/服务器系统）：套接字、远程过程调用RPC</p><p>此外还有管道（pipe）及命名管道（named pipe）：管道可用于具有亲缘关系的父子进程间的通信，命名管道除了具有管道所具有的功能外，它还允许无亲缘关系进程间的通信；</p><h3 id="在交互式系统中-非剥夺是不是一个好策略-为什么" tabindex="-1"><a class="header-anchor" href="#在交互式系统中-非剥夺是不是一个好策略-为什么" aria-hidden="true">#</a> 在交互式系统中，非剥夺是不是一个好策略？为什么？</h3><p>非剥夺方式：分派程序一旦把处理剂分配给某进程后便让它一直运行下去，直到进程完成或者发生进程调度某时间而阻塞时，才把处理剂分配给另一个进程</p><p>非剥夺并不是一个好策略，因为在分时系统中，除了交互性之外，及时性是很重要的性能因素，当一个作业被阻塞之后，CPU就完全空闲，别的用户及时性无法保证，而完全可以把这些时间分配给别的作业运行，提升整体吞吐量</p><h3 id="何为系统调用" tabindex="-1"><a class="header-anchor" href="#何为系统调用" aria-hidden="true">#</a> 何为系统调用？</h3><p>系统调用：OS与应用进程之间的接口，它是用户程序取得OS服务的唯一途径，与一般过程调用的区别：运行在不同系统状态。调用程序运行在用户态，被调用程序运行在系统态，通过软中断机制，先由用户态转为系统态，才能转向相应的系统调用子程序。一般过程调用返回后继续执行，但对系统调用，当调用的进程仍具有最高优先权时，才返回到调用进程继续处理，否则只能等被重新调度</p><h3 id="cpu不执行程序的时候在干什么" tabindex="-1"><a class="header-anchor" href="#cpu不执行程序的时候在干什么" aria-hidden="true">#</a> CPU不执行程序的时候在干什么？</h3><p>CPU空闲时在运行空闲任务（由<strong>重复执行HLT停机指令的循环</strong>组成），HLT指令目的是为了尽可能减少电量消耗，并使CPU进入节能模式</p><h3 id="举例解释一下同步与互斥pv" tabindex="-1"><a class="header-anchor" href="#举例解释一下同步与互斥pv" aria-hidden="true">#</a> 举例解释一下同步与互斥PV？</h3><ul><li>生产者-消费者问题</li><li>一组生产者向一组消费者提供产品，他们共享一个有界缓冲区，生产者向其中放产品，消费者从中取产品。只要缓冲区未满，生产者可以放产品；只要缓冲区有产品，消费者可以取产品</li><li>有界缓冲区是互斥的，生产者访问有界缓冲区时消费者不允许访问，同理反之亦然</li><li>同步存在于消费者与生产者中间，只有生产者生产出产品并放在有界缓冲区消费者才允许去消费，否则消费者进程阻塞，同步实现了访问者对资源的有序访问</li></ul><h3 id="说说同步和异步" tabindex="-1"><a class="header-anchor" href="#说说同步和异步" aria-hidden="true">#</a> 说说同步和异步</h3><ul><li>同步和异步关注的是消息通信机制</li><li>同步，就是调用某个东西时，调用方得等待这个调用返回结果才能继续往后执行。</li><li>异步，和同步相反， 调用方不会等待得到结果，而是在调用发出后调用者可用继续执行后续操作。当一个异步过程调用发出后，调用者不会立刻得到结果，而是在&quot;调用&quot;发出后，&quot;被调用者&quot;通过状态、通知来通知调用者，或通过回调函数处理这个调用。</li></ul><h3 id="说说阻塞与非阻塞" tabindex="-1"><a class="header-anchor" href="#说说阻塞与非阻塞" aria-hidden="true">#</a> 说说阻塞与非阻塞</h3><ul><li>阻塞和非阻塞强调的是程序在等待调用结果（消息，返回值）时的状态。</li><li>阻塞调用是指调用结果返回之前，当前线程会被挂起。调用线程只有在得到结果之后才会返回。</li><li>非阻塞调用指在不能立刻得到结果之前，该调用不会阻塞当前线程。 对于同步调用来说，很多时候当前线程还是激活的状态，只是从逻辑上当前函数没有返回而已，即同步等待时什么都不干，白白占用着资源。</li></ul><h3 id="线程同步的方式有哪些" tabindex="-1"><a class="header-anchor" href="#线程同步的方式有哪些" aria-hidden="true">#</a> 线程同步的方式有哪些</h3><ul><li>互斥量：采用互斥对象机制，只有拥有互斥对象的线程才有访问公共资源的权限。</li><li>信号量：它允许同一时刻多个线程访问同一资源，但是需要控制同一时刻访问此资源的最大线程数量。</li><li>事件（信号）：通过通知操作的方式来保持多线程同步，还可以方便的实现多线程优先级的比较操作。</li></ul><h3 id="什么是缓冲区溢出-有什么危害-其原因是什么" tabindex="-1"><a class="header-anchor" href="#什么是缓冲区溢出-有什么危害-其原因是什么" aria-hidden="true">#</a> 什么是缓冲区溢出？有什么危害？其原因是什么？</h3><ul><li>缓冲区溢出是指当前计算机向缓冲区填充数据时超出了缓冲区本身的容量，溢出的数据覆盖在合法数据上。</li><li>危害有以下两点： <ul><li>程序崩溃，导致拒绝服务;</li><li>跳转并执行一段恶意代码（缓冲区溢出攻击）。</li></ul></li><li>造成缓冲区溢出的主要原因是程序中没有仔细检查用户输入。</li></ul><h3 id="分页和分段有什么区别" tabindex="-1"><a class="header-anchor" href="#分页和分段有什么区别" aria-hidden="true">#</a> 分页和分段有什么区别？</h3><ul><li>段是信息的逻辑单位，它是根据用户的需求划分的，因此段是对用户可见的；页是信息的物理单位，是为了管理主存的方便而划分的，对用户是透明的。</li><li>段的大小不固定，由它所完成的功能决定；页的大小固定，由系统决定。</li><li>段向用户提供的是二维地址空间；页向用户提供的是一维地址空间。</li><li>段是信息的逻辑单位，便于存储保护和信息的共享，页的保护和共享受到限制。</li></ul><h3 id="进程与程序的区别" tabindex="-1"><a class="header-anchor" href="#进程与程序的区别" aria-hidden="true">#</a> 进程与程序的区别？</h3><p>程序本身不是进程，程序只是被动实体，如存储在磁盘上包含一系列指令的文件（经常称为可执行文件），相反，进程是活动实体，具有一个程序计数器用于表示下个执行指令和一组相关资源，当一个可执行文件被加载到内存时，这个程序就成为了进程。</p>',96),n=[t];function s(o,h){return l(),r("div",null,n)}const d=i(e,[["render",s],["__file","1.html.vue"]]);export{d as default};